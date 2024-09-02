const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/iNotebook";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
