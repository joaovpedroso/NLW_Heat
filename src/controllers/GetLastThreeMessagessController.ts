import { Request, Response } from "express";
import { GetLastThreeMessagesService } from "../services/GetLastThreeMessagesService";

class GetLastThreeMessagessController {
    async handle( request: Request , response: Response ) {

        try {
   
            const service  = new GetLastThreeMessagesService();
            const result   = await service.execute();
    
            return response.json( result );
            
        } catch ( error ) {
        
            return response.json( error.message );

        }

    }
}

export { GetLastThreeMessagessController };