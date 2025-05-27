const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./config/connection');
const urlRouter = require('./routes/urlRouter');
const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.set("views","./views");
connectToMongoDB();
if(!PORT)
{
    console.log("PORT is not set");
    process.exit(1);
}
//middleware to parse the body of the request
app.use(express.json());
app.use('/', urlRouter);
// server start
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
