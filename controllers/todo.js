const ToDo = require("../models/todo");
const errorHandler = require("../middleware/error");

//TODO add joi validation
//TODO add correct status codes or use the status code package
//TODO get confirmation about boolean values

const postTodo = async (req, res) => {
  //Create a new todo. It should return todo-id in response. Default status for todo is “pending”.
  const value = req.body;
  try {
    const toDo = await ToDo.create(value);
    res.status(201).json({ toDoId: `${toDo._id}` });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllToDo = async (req, res) => {
  // Get all todos, List of todos
  try {
    const toDos = await ToDo.find({});
    console.log("list", toDos);
    res.status(200).json({ toDos });
  } catch (error) {
    console.log("error", error);
    errorHandler(error, res);
  }
};
const getToDo = async (req, res) => {
  // Get todo by todoId
  try {
    const toDoId = req.params.toDoId;
    const toDo = await ToDo.findById(toDoId);
    if (!toDo) {
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    res.status(200).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};
const editTodo = async (req, res) => {
  // Mark todo status as done
  try {
    const toDoId = req.params.toDoId;
    console.log(toDoId);
    const toDo = await ToDo.findByIdAndUpdate(
      toDoId,
      { status: "done" },
      { returnDocument: "after" }
    );
    if (!toDo) {
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    res.status(201).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteToDo = async (req, res) => {
  // Delete todo by id
  try {
    const toDoId = req.params.toDoId;
    const toDo = await ToDo.findByIdAndDelete(toDoId);
    if (!toDo) {
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    res.status(200).json({ toDo });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { postTodo, getAllToDo, getToDo, editTodo, deleteToDo };
