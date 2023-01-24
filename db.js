const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mynotebook";

const connectToMongo = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successfully");
    });
}
module.exports = connectToMongo;