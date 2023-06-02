const request = require('supertest');
const app = require('../app'); // Assuming your Express.js app is exported from 'app.js'
const mongoose = require('mongoose');
const Task = require('../models/task');
const setupTestDB = require('./utils/setupTestDb');

setupTestDB()



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
      expect(response.body).toHaveProperty('message', 'New Task Created');
      expect(response.body.task).toHaveProperty('task', 'Test Task');
      expect(response.body.task).toHaveProperty('completed', false);
    });
  });

  describe('GET /api/todos', () => {
    beforeAll(async () => {
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
      expect(response.body.length).toBe(4);
    });
  });

  describe('GET /api/todos/:id', () => {
    let taskId;

    beforeAll(async () => {
      const task = await Task.create({ task: 'Sample Task', completed: false });
      taskId = task._id;
    });

    it('should get a specific task by ID', async () => {
      const response = await request(app).get(`/api/todos/${taskId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task Fetched');
      expect(response.body.task).toHaveProperty('_id', String(taskId));
      expect(response.body.task).toHaveProperty('task', 'Sample Task');
      expect(response.body.task).toHaveProperty('completed', false);
    });
  });


  describe('DELETE /api/todos/:id', () => {
    let taskId;

    beforeAll(async () => {
      const task = await Task.create({ task: 'Task to Delete', completed: false });
      taskId = task._id;
    });

    it('should delete a task by ID', async () => {
      const response = await request(app).delete(`/api/todos/${taskId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task deleted');

      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });
  });
});

