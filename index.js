const connectToMongo = require("./db");
const express = require("express");
require("dotenv/config");
connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());

app.use(
  "/auth",
  require("./routes/auth/createuser"),
  require("./routes/auth/login"),
  require("./routes/auth/getuser")
);

app.use(
  "/notes",
  require("./routes/notes/getallnotes"),
  require("./routes/notes/createnote"),
  require("./routes/notes/updatenote"),
  require("./routes/notes/deletenote"),
);

app.get("/", (req, res) => {
  res.send("Hello Susan");
});

app.listen(port, () => {
  console.log("The server is running at port: " + port);
});
