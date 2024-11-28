const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  'brew_city_rentals',  // Database name
  'admin',  // Database user
  'Brewcityrentals',  // Database password
  {
    host: 'database-2.ctegy2wkgkev.us-east-1.rds.amazonaws.com',  // Database host
    dialect: 'mysql'  // Dialect: MySQL
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
