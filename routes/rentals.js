const express = require('express');
const {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  returnRental
} = require('../controllers/rentalController');

const router = express.Router();

// Get all rentals
router.get('/', getAllRentals);

// Get a rental by ID
router.get('/:id', getRentalById);

// Create a new rental
router.post('/', createRental);

// Update a rental
router.put('/:id', updateRental);

// Delete a rental
router.delete('/:id', deleteRental);

// Endpoint to mark a rental as returned
router.put('/:id/return', returnRental);


module.exports = router;
