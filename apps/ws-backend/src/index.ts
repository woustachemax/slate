import {WebSocketServer} from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWT_SECRET} from '@repo/backend-common/config'

const wss = new WebSocketServer({port: 8080});


wss.on('connection', function connection(ws, request){

    if(!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    const url = request.url;
    if(!url) return ws.close(); ;

    const queryParams = new URLSearchParams(url.split('?')[1]); 
    const token = queryParams.get('token') || '';
    const decoded = jwt.verify(token, JWT_SECRET)

    if(!token) return ws.close();

    if(!decoded || !(decoded as JwtPayload).userId) return ws.close();

    ws.on('message', function message(data){
        ws.send('pong!')
    })
})