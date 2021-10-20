import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { router } from "./routes";
import { Server, Socket } from "socket.io";

const portApp   = 4000;
const app       = express();

// Permitir que o Express aceite conteúdos JSON
app.use( express.json() );

// utilizar o cors na aplicação
app.use( cors() );

const serverHttp = http.createServer( app );

// Permitir o acesso de qualquer origem no Cors
const io         = new Server( serverHttp, {
    cors: {
        origin: "*"
    }
});

// ENviar/Escutar um evento dentro do websocket
io.on( "connection", socket => console.log( "Usuário conectado no socket" + socket.id ) )

// Utilizar as rotas do arquivo Routes
app.use( router );

app.get( "/login/github", ( request, response ) => {
    response.redirect( "https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID )
});

app.get( "/signin/callback", ( request, response ) => {
    
    // Obtém o valor de ?code= vindo através do callback do Github
    const { code } = request.query;

    return response.json( code );

});

export { serverHttp, io, portApp };