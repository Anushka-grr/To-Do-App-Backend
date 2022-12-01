//todo=> description, id, status - pending/done
const mongoose = require("mongoose");
mongoose.Schema.Types.Boolean.convertToFalse.add("pending");
mongoose.Schema.Types.Boolean.convertToTrue.add("done");

const ToDoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  status: {
    type: Boolean,
    default: "pending",
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
