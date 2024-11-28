const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

// Define the Customer model
const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'customers',
  timestamps: false
});



module.exports = Customer;
