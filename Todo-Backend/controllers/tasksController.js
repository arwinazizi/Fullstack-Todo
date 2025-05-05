const Task = require('../models/Task')
const mongoose = require('mongoose');

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    if (!req.body.title) throw new Error('Task title is required');
    const newTask = await Task.create({
      title: req.body.title,
      user: req.user._id,
    });
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const result = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!result) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};