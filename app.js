const express = require("express");
const app = express();
const todos = require("./routes/todos");
const connectDb = require("./db/connect");
app.use(express.json());
app.use("/api", todos);
const start = async () => {
  try {
    connectDb();
    const port = 3000;
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
