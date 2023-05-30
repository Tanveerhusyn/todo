const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())


const DATABASE_URL = "mongodb+srv://tan:abcdefg@cluster0.wrwhy.mongodb.net/todo?retryWrites=true&w=majority"

// Connect to MongoDB using Mongoose
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Mount the task routes
app.use('/api/todos/', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const express = require('express');
// const app = express();
// const port = 5000;

// let todos = [];

// app.get('/api/todos', (req, res) => {
//   res.json(todos);
// });

// app.post('/api/todos', (req, res) => {
//   const newTodo = { id: Date.now(), ...req.body };
//   todos.push(newTodo);
//   res.json(newTodo);
// });

// app.put('/api/todos/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedTodo = req.body;
//   todos = todos.map((todo) => (todo.id === parseInt(id) ? { ...todo, ...updatedTodo } : todo));
//   res.json(updatedTodo);
// });

// app.delete('/api/todos/:id', (req, res) => {
//   const { id } = req.params;
//   todos = todos.filter((todo) => todo.id !== parseInt(id));
//   res.sendStatus(204);
// });

// app.listen(port, () => {
//   console.log(`Backend server is running on http://localhost:${port}`);
// });

