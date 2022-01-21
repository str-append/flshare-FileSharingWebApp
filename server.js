//main file

const express = require("express");
const app = express();
const path = require("path");    //path.join()
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

app.use(express.static('public')) //css for ejs  otherwise mime type error

//template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");


app.use(express.json())    //for parsing json data; specify for before routes

//Routers
app.use("/api/files", require("./routers/file")); //upload //localhost:3000/api/files
app.use("/files", require("./routers/show")); //download page rendering
app.use('/files/download',require('./routers/download'));  //download link
app.get("/", (req, res) => {
  //initial
  res.sendFile(__dirname+"/"+ "up.html");
});




app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});
