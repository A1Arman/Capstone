const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Movie = require('./movieModel');
const User = require('./userModel');

const Rental = sequelize.define('Rental', {
  rental_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATEONLY
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_returned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'rentals',
  timestamps: false
});

// Define relationships
Rental.belongsTo(User, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Rental.belongsTo(Movie, { foreignKey: 'movie_id', onDelete: 'CASCADE' });

module.exports = Rental;
