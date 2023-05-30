const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Create a new task
router.post('/', taskController.createTask);

// Get all tasks
router.get('/', taskController.getTasks);

// Get a specific task by ID
router.get('/:id', taskController.getTaskById);

// Update a task by ID
router.patch('/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
