// All import statements
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config()

//initial express app
const app = express();

// Replace this with your database model or data
const allCars = require('./index.js');  // Adjust based on your backend setup

//setup middleware

app.use(cors()); //middleware for allowing cross-origin resource sharing (eg. letting our client and server communicate)
app.use(express.json()); //built in middleware for parsing JSON sent in requests

//use Pool from pg package to create database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Final_Full_Stack',
  password: process.env.DB_PASSWORD,
  port: 5432 //port you want to connect for DB connection
});

// Route for searching cars with pagination
app.get('/api/cars/search', (req, res) => {
  const { term, make, model, year, page, pageSize } = req.query;

  // Assuming allCars is an array of cars
  let filteredCars = allCars.filter((car) =>
    car.make.toLowerCase().includes(make.toLowerCase()) &&
    car.model.toLowerCase().includes(model.toLowerCase()) &&
    car.year.toString().includes(year) &&
    (car.make.toLowerCase().includes(term.toLowerCase()) ||
    car.model.toLowerCase().includes(term.toLowerCase()) ||
    car.year.toString().includes(term))
  );

  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize, 10);
  const slicedResults = filteredCars.slice(startIndex, endIndex);

  res.json(slicedResults);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
