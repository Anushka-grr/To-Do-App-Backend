const ToDo = require("../models/todo");
const errorHandler = require("../utils/errorHandler");
const Joi = require("joi");
const validator = require("../utils/validator");

//validating request using JOI
const toDoSchema = Joi.object({
  //description is required and should be a string with max 100 alphanumeric characters (spaces allowed)
  description: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9 ]*$"))
    .max(100)
    .min(2)
    .required(),
});

// creating a new todo that returns todo-id in response. Default status for todo is “pending”.
const postTodo = async (req, res) => {
  //getting the todo description from user
  const { error, value } = validator(toDoSchema, req.body);
  if (error) {
    console.log("Error in validation : ", error);
    return res.status(400).json({ error });
  }
  try {
    console.log("req.body validated using JOI");
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
      // if no matching todDo-id found in db throw error
      console.log(`No ToDo with id ${toDoId} found`, toDo);
      return res
        .status(404)
        .json({ message: `No ToDo with id ${toDoId} found` });
    }
    console.log("Updated To Do", toDo);
    res.status(200).json({ toDo });
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
      // if no matching todDo-id found in db throw error
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
