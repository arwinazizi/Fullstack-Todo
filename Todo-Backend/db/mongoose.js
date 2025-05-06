const mongoose = require('mongoose');

console.log('✅ Connected to DB:', mongoose.connection.name);


async function connectToMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Mongoose connected');
  } catch (err) {
    console.error('❌ Mongoose connection error:', err);
    process.exit(1);
  }
}

module.exports = connectToMongoose;
