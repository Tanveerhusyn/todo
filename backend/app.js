const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const db  = require('./config/db');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())


// Connect to MongoDB using Mongoose
 db.connectToDatabase()

// Middleware
 app.use(express.json());

// Mount the task routes
app.use('/api/todos/', taskRoutes);


// // Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

 
