const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const sequelize = require('./config/sequelize');

dotenv.config();

const db = require('./config/db'); // MySQL configuration and connection
const customerRoutes = require('./routes/customers');
const employeeRoutes = require('./routes/employees');
const movieRoutes = require('./routes/movies');
const rentalRoutes = require('./routes/rentals');
const authRoutes = require('./routes/auth');

const app = express();
const sessionStore = new MySQLStore({}, db);

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// API routes
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/auth', authRoutes);

// Sync models with the database (create tables)
sequelize.sync({ force: false })  // 'force: true' will drop and re-create tables; 'false' to prevent this in production
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
