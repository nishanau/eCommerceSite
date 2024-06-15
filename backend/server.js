// server.js
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { Sequelize } = require('sequelize');

const authRoutes = require('./routes/auth'); // Ensure this path is correct
require('./config/passport'); // Ensure this path is correct and it sets up passport strategies

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Define routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => res.send('API Running'));

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
