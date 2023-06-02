const taskService = require('../services/taskServices');

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).send({message:"New Task Created",task:task});
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).send();
    }
    res.send({message:'Task Fetched',task:task});
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const task = await taskService.updateTask(id, updates);
    res.status(200).send({message:'Task updated',task:task});
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskService.deleteTask(id);
    if (!task) {
      return res.status(404).send();
    }
    res.send({message:'Task deleted',task:task});
  } catch (error) {
    res.status(500).send(error);
  }
};
