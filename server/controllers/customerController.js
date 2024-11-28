const Customer = require('../models/customerModel');
const User = require('../models/userModel');

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error });
  }
};

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newCustomer = await Customer.create({ name, email, phone, address });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

// Update a customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const { name, email, phone, address } = req.body;
    await customer.update({ name, email, phone, address });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    await customer.destroy();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
