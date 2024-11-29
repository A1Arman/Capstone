const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: 'admin',
  password: process.env.DB_PASS,
  port: '3306',
  database: 'brew_city_rentals'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

module.exports = db;
