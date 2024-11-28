const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/sequelize');
const Customer = require('./customerModel');
const Employee = require('./employeeModel');
const phoneValidationRegex = '^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$'
// Define the User model for authentication
const User = sequelize.define('User', {
firstName: {
    type: DataTypes.STRING,
    allowNull: false
},
lastName: {
    type: DataTypes.STRING,
    allowNull: false
},
phone: {
    type: DataTypes.STRING,
    allowNull: false,
},
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'  // Role could be 'customer' or 'employee'
  }
}, {
  tableName: 'users',
  timestamps: false
});

// // Relationship
// Customer.hasOne(User, {foreignKey: 'customer_id', onDelete: 'CASCADE' });
// // Define relationships
// User.belongsTo(Customer, { foreignKey: 'customer_id', onDelete: 'CASCADE', as: 'customer' });

// // Relationship
// Employee.hasOne(User, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
// User.belongsTo(Employee, {foreignKey: 'employee_id', onDelete: 'CASCADE', as: 'employee' });

// Method to compare hashed password with plain text password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;



