import express, { Request, Response, Router } from 'express';
import { middleware } from './middleware';
import {JWT_SECRET} from '@repo/backend-common/config'
import {creatUserSchema, createRoomSchema, loginUserSchema} from '@repo/common/config';

const app = express();
app.use(express.json());

export const router: Router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    const parsedResult = loginUserSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }
    res.json({ message: 'Login' });
});

router.post('signup', (req: Request, res:Response)=>{
    const parsedResult = creatUserSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }
    res.json({message: 'Signup'})
})

router.post('/room', middleware, (req: Request, res: Response) => {
    const parsedResult = createRoomSchema.safeParse(req.body);
    if(!parsedResult.success){
        return res.status(400).json({error: parsedResult.error})
    }
    res.json({ message: 'Create Room' });

})

