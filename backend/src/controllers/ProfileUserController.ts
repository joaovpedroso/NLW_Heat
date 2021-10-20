import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { CreateMessageService } from "../services/CreateMessageService";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
    async handle( request: Request , response: Response ) {

        try {

            const { user_id }   = request;
            const service       = new ProfileUserService();
            const user          = await service.execute( user_id );
    
            return response.json( user );
            
        } catch ( error ) {
        
            return response.json( error.message );

        }

    }
}

export { ProfileUserController };