const mongoose = require("mongoose");
require("dotenv").config();


// database connection

exports.connectMongoose = () => {
  mongoose
    .connect(process.env.mongoURL)
    .then((e) => {
      console.log(`Connected to mongoDB: ${e.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
