const express = require('express');
const {
    getHealth
  } = require('../controllers/healthController');

const router = express.Router();

// Register a new user
router.get('/', getHealth);


module.exports = router;
