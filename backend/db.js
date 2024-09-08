const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI=process.env.MONGO_URI;
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
