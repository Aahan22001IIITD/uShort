const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./config/connection');
const urlRouter = require('./routes/urlRouter');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser'); 
const {allowtologgedInUsers} = require('./middlewares/auth');
const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.set("views","./views");
app.use(cookieParser()); 
connectToMongoDB();
if(!PORT)
{
    console.log("PORT is not set");
    process.exit(1);
}
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
//middleware to parse the body of the request
app.use(express.json());
app.use('/url',allowtologgedInUsers, urlRouter);
app.use('/user',userRouter);
// server start
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
