const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.log("MONGO_URI is not set , in config/connection.js");
    process.exit(1);
}
function connectToMongoDB() {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    });
}
module.exports = connectToMongoDB;