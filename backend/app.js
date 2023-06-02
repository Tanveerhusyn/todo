const express = require('express');

const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');


const app = express();


app.use(express.json());
app.use(cors())




// Middleware
 app.use(express.json());

// Mount the task routes
app.use('/api/todos/', taskRoutes);



module.exports = app;

 
