const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 3000;


app.get("/", (req,res)=>{
    res.send("Hello Susan");
});

app.listen(port, ()=>{
    console.log("The server is running at port: "+ port);
})
