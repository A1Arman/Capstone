const express = require('express');
const { registerUser, loginUser, getUser, updatePassword, deleteAccount } = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Login a user
router.get('/:id', getUser);

// update a user password
router.put('/:id/update-password', updatePassword);


// update a user password
router.delete('/:id', deleteAccount);


module.exports = router;
