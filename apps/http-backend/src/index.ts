import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import { router } from './app/account.js';

const app = express();
app.use(express.json());

app.use('/api/v1/', router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`http backend active on port: ${PORT}`);
})