const Movie = require('../models/movieModel');
const Rental = require('../models/rentalModel');
const User = require('../models/userModel')

// Get all rentals
const getAllRentals = async (req, res) => {
  try {
    let userId;
    if (req.query.userId) {
      userId = req.query.userId
    } else if (req.headers.userId) {
      userId = req.headers.userId
    }
    const user = await User.findByPk(userId)
    let rentals
    if (user.role === 'employee') {
      // Find rentals that match the userId
      rentals = await Rental.findAll({
        include: [{
          model: Movie,
          required: true
        }]
      })
    } else {
      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // Find rentals that match the userId
      rentals = await Rental.findAll({ 
        where: {customer_id: userId, is_returned: false},
        include: [{
          model: Movie,
          required: true
        }]
      })

      if (rentals.length === 0) {
          return res.status(200).json({ message: 'No rentals found for this user' });
      }
    }

    return res.status(200).json(rentals);
} catch (error) {
  console.log(error)
    console.error('Error fetching rentals by userId:', error);
    res.status(500).json({ message: 'Server error' });
}
};

// Get a rental by ID
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rental', error });
  }
};

// Create a new rental
const createRental = async (req, res) => {
  try {
    const { customerId, movieId, rentalDate, returnDate, paymentMethod } = req.body;
    const newRental = await Rental.create({ customer_id: customerId, movie_id: movieId, rental_date: rentalDate, return_date: returnDate, payment_method: paymentMethod});
    const movie = await Movie.findByPk(movieId);
    await movie.update({quantity: movie.quantity-1})
    res.status(201).json(newRental);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rental', error });
  }
};

// Update a rental
const updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    const { returnDate, paymentMethod } = req.body;
    console.log(req.body)
    await rental.update({ return_date: returnDate, payment_method: paymentMethod });
    console.log(rental)
    res.json(rental);
  } catch (error) {
    res.status(500).json({ message: 'Error updating rental', error });
  }
};

// Delete a rental
const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    await rental.destroy();
    res.json({ message: 'Rental deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rental', error });
  }
};

const returnRental =  async (req, res) => {
  const rentalId = req.params.id;

  try {
    // Find the rental by ID
    const rental = await Rental.findByPk(rentalId);
    const movie = await Movie.findByPk(rental.movie_id)
    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // Update rental as returned
    rental.is_returned = true;
    await movie.update({quantity: movie.quantity-1})
    await rental.update({is_returned: true});

    res.status(200).json({ message: 'Rental returned successfully', rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning rental', error });
  }
}


module.exports = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  returnRental
};
