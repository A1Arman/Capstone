const express = require('express');
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

const router = express.Router();

// Get all customers
router.get('/', getAllCustomers);

// Get a customer by ID
router.get('/:id', getCustomerById);

// Create a new customer
router.post('/', createCustomer);

// Update a customer
router.put('/:id', updateCustomer);

// Delete a customer
router.delete('/:id', deleteCustomer);

module.exports = router;
