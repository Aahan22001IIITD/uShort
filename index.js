const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.set('view engine', 'ejs');
const config = require('./config/connection');
config.connectToMongoDB();
const PORT = process.env.PORT || 3000;
if(!PORT)
{
    console.log("PORT is not set");
    process.exit(1);
}
//middleware to parse the body of the request
app.use(express.json());
// server start
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});







