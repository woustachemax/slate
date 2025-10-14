import express, { Request, Response, Router } from 'express';
import { middleware } from './middleware.js';
import {JWT_SECRET} from '@repo/backend-common/config'
import {creatUserSchema, createRoomSchema, loginUserSchema} from '@repo/common/config';
import client from '@repo/database/database'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

if(!JWT_SECRET) throw new Error("JWT secret isn't configured");

const app = express();
app.use(express.json());

export const router: Router = express.Router();

router.post('/signup', async (req: Request, res:Response)=>{

    const parsedResult = creatUserSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }
    try{
        const { username, email, password } = parsedResult.data;

        const existingUser = await client.user.findUnique({ where: { email } });
        if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(parsedResult.data.password, 10);
        const response = await client.user.create({
            data:{
                userName:parsedResult.data.username,
                password: hashedPassword,
                email: parsedResult.data.email
            }
        })

        const token =  jwt.sign({ id: response.id, email: response.email, username: response.userName },
        JWT_SECRET!,
        { expiresIn: "7d" })

        return res.status(200).json({message: "Account created succesfully!", token})

    }
    catch(e){
        if(e instanceof Error){
            return res.status(403).json({message: e.message})
        }
        else res.status(403).json({message: "Some unknown error occured!"});

    }
})

router.post('/login', async (req: Request, res: Response) => {

    const parsedResult = loginUserSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }

    try{
        const userExists = await client.user.findUnique({
            where:{
                email: parsedResult.data.email
            }
        })

    const decoded = await bcrypt.compare(parsedResult.data.password, userExists?.password!);

    if(!userExists || decoded == false) return res.status(403).json({err: "There was an error verifying your account, try signing up instead!"})
    
    const token = jwt.sign({id: userExists.id, email: userExists.email, username: userExists.userName},
        JWT_SECRET!,
        {expiresIn: "7d"}
    )
    return res.status(200).json({message: "Logged in succesfully!", token})

    }
    catch(e){
        if(e instanceof Error){
            return res.status(403).json({message: e.message})
        }
        else res.status(403).json({message: "Some unknown error occured!"});
    }
});

router.post('/room', middleware, async (req: Request, res: Response) => {
    const parsedResult = createRoomSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }
    try{
        const existingRoom = await client.room.findUnique({ where: { slug: parsedResult.data.slug }});
        if(existingRoom){
        return res.status(409).json({ message: "Room slug already exists" });
        }

        const userId = req.userId;

        if(!userId) return res.status(403).json({err: "User is invalid"});

        const room = await client.room.create({
            data: {
                adminId: userId,
                slug: parsedResult.data.slug
            }
        })

     return res.status(200).json({message: "Room created succesfully!", 
        roomId: room.id})

    }
    catch(e){
        if(e instanceof Error){
            return res.status(403).json({message: e.message})
        }
        else res.status(403).json({message: "Some unknown error occured!"});
    }


})

router.get('/room_exists', async (req: Request, res: Response) => {
  const slug = req.query.slug as string;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  try {
    const room = await client.room.findUnique(
        { where: 
            { slug } 
        });
    return res.status(200).json({ exists: !!room });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get("/room/:slug", async (req: Request, res: Response) => {
  const slug = req.params.slug;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    const room = await client.room.findUnique({
      where: 
      {
         slug 
        }
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({ room });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    } else {
      return res.status(500).json({ message: "Unknown server error occurred" });
    }
  }
});