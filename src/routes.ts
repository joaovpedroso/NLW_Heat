import { Router } from "express";
import { AuthentiicateUserController } from "./controllers/AuthentiicateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastThreeMessagessController } from "./controllers/GetLastThreeMessagessController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post( "/authenticate", new AuthentiicateUserController().handle );
router.post( "/messages", ensureAuthenticated, new CreateMessageController().handle );

router.get( "/messages/last", new GetLastThreeMessagessController().handle );
router.get( "/user/profile", ensureAuthenticated, new ProfileUserController().handle );

export { router };