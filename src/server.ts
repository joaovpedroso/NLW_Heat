import { portApp, serverHttp } from "./app";

serverHttp.listen(portApp, () => console.log("Run application in port: " + portApp) );