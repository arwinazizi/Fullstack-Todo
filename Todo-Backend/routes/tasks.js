const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');

router.use(auth); // apply to all /tasks routes

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask)
router.delete('/:id', tasksController.deleteTask);
router.put('/:id', tasksController.updateTask)

module.exports = router;