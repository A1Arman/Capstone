const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  'brew_city_rentals',  // Database name
  'admin',  // Database user
  process.env.DB_PASS,  // Database password
  {
    host: process.env.HOST,  // Database host
    dialect: 'mysql'  // Dialect: MySQL
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
