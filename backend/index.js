const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
//routes
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')
const hotelsRouter = require('./routes/hotels')
//middlewars
const errorMdl = require('./middlewars/errorMdl');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig)) 

let port = process.env.PORT || 8800;

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connect with DB')
})
.catch((err)=>{
    console.log('err'+err);
})

mongoose.connection.on('connected',()=>{
    console.log('mongoDB connected!')
})


app.listen(port,()=>{
    console.log('listening to port :'+port);
});

app.get('/',(req,res)=>{
    res.json('hello world 2')
})


app.use('/auth',authRouter);

app.use('/hotels',hotelsRouter);

app.use('/users',usersRouter);

app.use('/rooms',roomsRouter);


app.use(errorMdl)
