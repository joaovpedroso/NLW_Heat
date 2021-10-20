import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
    async handle( request: Request , response: Response ) {

        try {

            const { message } = request.body;
            const { user_id } = request;
            const service     = new CreateMessageService();
            const result      = await service.execute( message, user_id );
    
            return response.json( result );
            
        } catch ( error ) {
        
            return response.json( error.message );

        }

    }
}

export { CreateMessageController };