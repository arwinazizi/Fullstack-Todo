const mongoose = require('mongoose');
const Task = require('./models/Task');

(async () => {
  await mongoose.connect('mongodb://localhost:27017/taskdb');
  const tasks = await Task.find();
  console.log(tasks);
  process.exit();
})();
