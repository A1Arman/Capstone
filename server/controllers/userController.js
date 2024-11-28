const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, firstName, lastName, phone } = req.body;
    const phoneRegex = /^(\+1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

    // Check if phone number matches the regex
    if (!phoneRegex.test(phone)) {
      throw new Error('Please enter a valid US phone number.');
    }
    // Check if the username or email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      phone,
      email,
      password,
      role
    });

    console.log(newUser)

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Error registering user: ${error.message}`, error });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user)
  

    const isPasswordValid = password === user.password ? true : false;

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = { token, user, id: user.id}

    res.json({ message: 'Login successful', response });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get user
const getUser = async (req, res) => {
  try {
      const userId = req.params.id;

      // Fetch the user from the database
      const user = await User.findByPk(userId, {
          attributes: ['id', 'username', 'email'] // Only return the required fields
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching account info:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePassword = async (req, res) => {
  try {
        const userId = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both current and new passwords are required.' });
        }

        // Fetch the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the current password matches
        const isMatch = currentPassword === user.password;

        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }

        user.password = newPassword
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const deleteAccount = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Delete the user's account
    await user.destroy();

    return res.status(200).json({ message: 'Account deleted successfully.' });
} catch (error) {
  console.error('Error deleting account:', error);
  return res.status(500).json({ message: 'Internal server error.' });
}
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updatePassword,
  deleteAccount
};
