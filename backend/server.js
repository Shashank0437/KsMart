import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import config from './config.js';
import router from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import productRouter from './routers/productRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

mongoose.connect(config.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection to mongodb successful..`);
}).catch((e)=>{
   console.log(`no connection from database`);
})

const app=express();
const port=3000;
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname,'/../uploads')));
app.use(express.static(path.join(__dirname,'/../frontend')));

app.use(express.json());                                 //middleware line1  parse JSON body
app.use(express.urlencoded({ extended: false }));        //middleware line2  parse url body


app.use('/api/uploads',uploadRouter);
app.use('/api/users',router);
app.use('/api/orders',orderRouter);
app.use('/api/products',productRouter);

app.get('/api/paypal/clientId',(req,res)=>{
res.send({ clientId:config.PAYPAL_CLIENT_ID})
})


app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({message:` Invalid Email or Password. ${err.name}`});
})

app.listen(config.PORT,()=>{
    console.log(`server running at http://localhost:${port}`);
})