const request = require('supertest');
const app = require('../app'); // Assuming your Express.js app is exported from 'app.js'
const mongoose = require('mongoose');
const Task = require('../models/task');

 
beforeAll(async () => {
    await Task.deleteMany({});
});

afterAll(async () => {
  // Disconnect from the database after all tests are done
  await mongoose.disconnect();
 

});

describe('Task API', () => {
  describe('POST /api/todos', () => {
    it('should create a new task', async () => {
      const newTask = {
        task: 'Test Task',
        completed: false,
      };

      const response = await request(app)
        .post('/api/todos')
        .send(newTask);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('task', 'Test Task');
      expect(response.body).toHaveProperty('completed', false);

      // Check if the task is saved in the database
      const savedTask = await Task.findById(response.body._id);
      expect(savedTask).toBeDefined();
      expect(savedTask.task).toBe('Test Task');
      expect(savedTask.completed).toBe(false);
    });
  });

  describe('GET /api/todos', () => {
    beforeAll(async () => {
      // Add some sample tasks to the database for testing the GET endpoint
      

      await Task.create([
        { task: 'Task 1', completed: false },
        { task: 'Task 2', completed: true },
        { task: 'Task 3', completed: false },
      ]);
    });

    it('should get all tasks', async () => {
      const response = await request(app).get('/api/todos');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(4); // Assuming 3 tasks are added in the beforeAll hook
    });
  });

  describe('GET /api/todos/:id', () => {
    let taskId;

    beforeAll(async () => {
      // Add a sample task to the database for testing the GET by ID endpoint
      const task = await Task.create({ task: 'Sample Task', completed: false });
      taskId = task._id;
    });

    it('should get a specific task by ID', async () => {
      const response = await request(app).get(`/api/todos/${taskId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', String(taskId));
      expect(response.body).toHaveProperty('task', 'Sample Task');
      expect(response.body).toHaveProperty('completed', false);
    });
  });


  describe('DELETE /api/todos/:id', () => {
    let taskId;

    beforeAll(async () => {
      // Add a sample task to the database for testing the DELETE endpoint
      const task = await Task.create({ task: 'Task to Delete', completed: false });
      taskId = task._id;
    });

    it('should delete a task by ID', async () => {
      const response = await request(app).delete(`/api/todos/${taskId}`);

      expect(response.statusCode).toBe(200);

      // Check if the task is deleted from the database
      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });
  });
});
