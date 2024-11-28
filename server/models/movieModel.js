const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'movies',
  timestamps: false
});

module.exports = Movie;
