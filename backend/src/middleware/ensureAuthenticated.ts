import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../interfaces/IPayload";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if ( !authToken )
        return response.status(401).json({
            errorCode: "token.invalid"
        });

    // Validar se o token é valido
    const [, token] = authToken.split(" ");

        try {

            const { sub } = verify( token, process.env.JWT_SECRET ) as IPayload;
            
            request.user_id = sub; 

            return next();

        } catch (error) {
            return response.status(401).json({
                errorCode: "token.expired"
            });
        }

}