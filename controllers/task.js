import db from "../mssql/db.js";

export const createTask = async (req, res) => {
  try {
    const task = await db.Task.findOne({ where: { id: req.body.id } });
    if (task) {
      res.status(400).json({ message: "Task already exists" });
    }
    if (req.body.employeeId !== null) {
      const employee = await db.Employee.findOne({
        where: { id: req.body.employeeId },
      });
      if (!employee) {
        res.status(400).json({ message: "Employee does not exists" });
      }
    }
    const newTask = await db.Task.create(req.body);
    res.status(200).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const readTasks = async (req, res) => {
  try {
    const tasks = await db.Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await db.Task.findOne({ where: { id: req.body.id } });
    if (!task) {
      res.status(400).json({ message: "Task does not exists" });
    }
    if (req.body.employeeId !== null) {
      const employee = await db.Employee.findOne({
        where: { id: req.body.employeeId },
      });
      if (!employee) {
        res.status(400).json({ message: "Employee does not exists" });
      }
    }
    task.update(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await db.Task.findOne({ where: { id: req.body.id } });
    if (!task) {
      res.status(400).json({ message: "Task does not exists" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
