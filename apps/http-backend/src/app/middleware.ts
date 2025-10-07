import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backend-common/config'

export async function middleware(req: Request, res: Response, next: NextFunction){


    if(!JWT_SECRET) throw new Error("JWT_SECRET is not defined");


    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    if(process.env.JWT_SECRET == undefined) throw new Error("JWT_SECRET is not defined");

   const decoded =  jwt.verify(token, JWT_SECRET, (err)=>{
        if(err) return res.sendStatus(403);
        next();
   })

   if(decoded == null) return res.sendStatus(403);

   if(decoded){
    //@ts-ignore
    req.userId = decoded.userId;
    next();
   }

}