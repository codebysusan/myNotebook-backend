const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express();
const port = 3000;

// Available routes
app.use("/auth", require("./routes/auth"));
app.use("/notes", require("./routes/notes"));


app.get("/", (req,res)=>{
    res.send("Hello Susan");
});

app.listen(port, ()=>{
    console.log("The server is running at port: "+ port);
})