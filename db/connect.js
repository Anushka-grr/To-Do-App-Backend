const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = () => {
  const url = process.env.MONGO_URI;
  if (!url) {
    throw new Error("Mongo Url NOt Found in Environment variable");
  }
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
module.exports = connectDb;
