const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

// Define the Employee model
const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'employees',
  timestamps: false
});


module.exports = Employee;
