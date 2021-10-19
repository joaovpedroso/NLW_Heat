import { ApiGithub } from "./Api";
import { IAccessTokenInterface } from "../interfaces/IAccessTokenInterface";
import { IUserResponseInterface } from "../interfaces/IUserResponseInterface";
import { sign } from "jsonwebtoken";

import prismaClient from "../prisma";

class AuthenticateUserService {
    async execute( code: String ) {

        const url       = "https://github.com/login/oauth/access_token";

        // Definir o tipo de retorno com o < INTERFACE >
        const { data: acessTokenResponse }  = await ApiGithub.post<IAccessTokenInterface>( url, null, {
            params: {
                code
            }
        });

        const userInfo = await this.findUserInfoByAccessToken( acessTokenResponse.access_token );
        const { login, id, avatar_url, name } = userInfo.data;
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if ( !user ) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            });
        }

        const token = sign(
            {
                user: {
                    name: (await user).name,
                    avatar_url: (await user).avatar_url,
                    id: (await user).id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: (await user).id,
                expiresIn: "1d"
            }            
        )

        return { token, user };
    }

    findUserInfoByAccessToken( acessToken: String ) {

        return ApiGithub.get<IUserResponseInterface>( "https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${acessToken}`
            }
        } )
    }
}

export { AuthenticateUserService };