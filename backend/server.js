require('dotenv').config()
const express = require("express");
const app = express();
const connect = require('./config/db')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const bookRoutes = require('./routes/bookRoutes')
const categoryRoute = require('./routes/categoryRoute')
require('colors')
connect()

// Routes...
app.use('/api/books', bookRoutes)
app.use('/api/categories', categoryRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));