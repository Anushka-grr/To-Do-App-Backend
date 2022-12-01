const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  //description of the to do
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  //to do status can be 'pending' or 'done'
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
