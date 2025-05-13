const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'vbadadadlka',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Allows us to parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from 'public' folder

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('DB Connection Error: ', err));

// Import Routes
const billRoutes = require('./routes/billRoutes');

// Use Bill Routes
app.use('/', billRoutes);
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// // db.js
// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'sql112.infinityfree.com',
//   user: 'if0_38974788',
//   password: 'Iy3iRt6juSw9DKP', // your MySQL root password
//   database: 'if0_38974788_XXX'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('✅ MySQL Connected');
// });

// module.exports = db;
