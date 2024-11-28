const Employee = require('../models/employeeModel');
const User = require('../models/userModel');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, role, email } = req.body;
    const newEmployee = await Employee.create({ name, role, email });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const { name, role, email } = req.body;
    await employee.update({ name, role, email });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    await employee.destroy();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
