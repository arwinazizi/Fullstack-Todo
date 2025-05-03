const mongoose = require('mongoose');

async function connectToMongoosee() {
    try {
        await mongoose.connect('mongodb://localhost:27017/taskdb');
        console.log('✅ Mongoose connected');
    } catch (err) {
        console.error('❌ Mongoose connection error:', err);
        process.exit(1);
    }
}

module.exports = connectToMongoosee;