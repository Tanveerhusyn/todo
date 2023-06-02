const Task = require('../models/task');

async function createTask(taskData) {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    throw error;
  }
}

async function getTasks() {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw error;
  }
}

async function getTaskById(id) {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    throw error;
  }
}

async function updateTask(id, updates) {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(id) {
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
