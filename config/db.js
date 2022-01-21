//database connection module

const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //procees.env.MONGO.... contains url with password and username stored in .env file in root folder;

  const connection = mongoose.connection;

  connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
  });
  connection.once("open", () => {
    console.log("Connected to Database");
  });
  //   .catch((err) => {
  //     console.log("Error occured failed to connect to DB");
  //   });
}

module.exports = connectDB;
