const express = require("express");
const router = express.Router();
const {
  postTodo,
  getAllToDo,
  getToDo,
  editTodo,
  deleteToDo,
} = require("../controllers/todo");

router.route("/todo").post(postTodo);
router.route("/todos").get(getAllToDo);
router.route("/todo/:toDoId").get(getToDo);
router.route("/todo/:toDoId/done").patch(editTodo);
router.route("/todo/:toDoId/delete").delete(deleteToDo);

module.exports = router;
