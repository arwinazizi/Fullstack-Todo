const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask)
router.delete('/:id', tasksController.deleteTask);
router.put('/:id', tasksController.updateTask)

module.exports = router;