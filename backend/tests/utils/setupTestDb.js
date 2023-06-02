const mongoose = require('mongoose');
const config = require('../../config/config');
const logger = require('../../config/logger');
const Task = require('../../models/task');

const setupTestDB = () => {
    jest.useRealTimers();

  beforeAll(async () => {

    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    await Task.deleteMany({});
     
  });

 

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;