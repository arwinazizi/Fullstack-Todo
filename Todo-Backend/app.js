require('dotenv').config();

const express = require('express');
const connectToMongoose = require('./db/mongoose');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

connectToMongoose()
  .then(() => {
    app.use('/tasks', taskRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Mongoose connection failed:', err);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});
