import express from 'express';
import { router } from './app/account';

const app = express();
app.use(express.json());

app.use('api/v1/', router)

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`http backend active on port: ${PORT}`);
})

