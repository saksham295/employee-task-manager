import db from "../mssql/db.js";

export const createEmployee = async (req, res) => {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.body.id } });
    if (employee) {
      res.status(400).json({ message: "Employee already exists" });
    }
    const newEmployee = await db.Employee.create(req.body);
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const readEmployees = async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.body.id } });
    if (!employee) {
      res.status(400).json({ message: "Employee does not exist" });
    }
    employee.update(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.body.id } });
    if (!employee) {
      res.status(400).json({ message: "Employee does not exists" });
    }
    await db.Task.update(
      { employeeId: null },
      { where: { employeeId: req.body.id } }
    );
    await employee.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
