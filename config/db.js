const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'database-2.ctegy2wkgkev.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Brewcityrentals',
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
