const express = require('express');
const todoController = require('../controllers/todo');
const { runValidation, createTodo } = require('../validation');

const router = express.Router();

router.post('/', createTodo, runValidation, todoController.createTodoItems);

router.get('/', todoController.getAllTodoItems);

router.get('/:id', todoController.getDetailTodoItems);

router.patch('/:id', todoController.updateTodoItems);

router.delete("/:id", todoController.deleteTodoItems);

module.exports = router;