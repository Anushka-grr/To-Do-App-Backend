const ToDo = require("../models/todo");
const errorHandler = require("../middleware/error");

//TODO add joi validation
//TODO add correct status codes or use the status code package
//TODO get confirmation about boolean values

// creating a new todo that returns todo-id in response. Default status for todo is “pending”.
const postTodo = async (req, res) => {
  //getting the todo description from user
  const value = req.body;
  try {
    const toDo = await ToDo.create(value);
    console.log("To Do :", toDo);
    res.status(201).json({ toDoId: `${toDo._id}` });
  } catch (error) {
    errorHandler(error, res);
  }
};
// getting all todos from db
const getAllToDo = async (req, res) => {
  try {
    const toDos = await ToDo.find({});
    console.log("To Do List", toDos);
    res.status(200).json({ toDos });
  } catch (error) {
    errorHandler(error, res);
  }
};
// getting single todo by todo-Id
const getToDo = async (req, res) => {
  try {
    // storing the toDo-id
    const toDoId = req.params.toDoId;
    const toDo = await ToDo.findById(toDoId);
    // if no matching todDo-id found in db throw error
    if (!toDo) {
      console.log(`No ToDo with id ${toDoId} found`, toDo);
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    console.log("To Do", toDo);
    res.status(200).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};
// update todo status to done
const editTodo = async (req, res) => {
  try {
    const toDoId = req.params.toDoId;
    const toDo = await ToDo.findByIdAndUpdate(
      toDoId,
      { status: "done" },
      { returnDocument: "after" } //returns updated document
    );
    if (!toDo) {
      console.log(`No ToDo with id ${toDoId} found`, toDo);
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    console.log("Updated To Do", toDo);
    res.status(201).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};
// delete todo by toDo-id
const deleteToDo = async (req, res) => {
  try {
    const toDoId = req.params.toDoId;
    const toDo = await ToDo.findByIdAndDelete(toDoId);
    if (!toDo) {
      console.log(`No ToDo with id ${toDoId} found`, toDo);
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    console.log("Deleted To Do", toDo);
    res.status(200).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { postTodo, getAllToDo, getToDo, editTodo, deleteToDo };
