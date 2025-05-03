
const Task = require('../models/Task')
const mongoose = require('mongoose');

exports.getAllTasks = async (req, res, next) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
};

exports.createTask = async (req, res, next) => {
  try {
    if(!req.body.title) throw new Error('Task title is required');
    const newTask = await Task.create({ title: req.body.title });
    res.status(201).json(newTask);
  } catch (err) {
    next(err)
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};
