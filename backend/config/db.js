const mongoose = require('mongoose');
const MONGODB_URI = require('./constants');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

module.exports = {
  connectToDatabase,
  mongoose, // Optionally export the mongoose instance for other modules to use
};
