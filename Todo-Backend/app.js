const express = require('express');
const connectToMongoose = require('./db/mongoose') // new connection file
const taskRoutes = require('./routes/tasks');
const cors = require('cors');



const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Optional: Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB via Mongoose
connectToMongoose()
  .then(() => {
    // Register task routes only after DB connection is established
    app.use('/tasks', taskRoutes);

    // Start the server
    app.listen(3000, () => {
      console.log('✅ Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ Mongoose connection failed:', err);
    process.exit(1);
  });

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});