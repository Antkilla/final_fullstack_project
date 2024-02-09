const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Cars',
  password: process.env.DB_PASSWORD,
  port: 5432
});

const MARKETCHECK_API_KEY = 'f9589687-bd9d-49c5-b0a6-d8feb8290c4b'; // Replace with my API key

app.get('/api/cars/search', async (req, res) => {
  const { term, make, model, year, page, pageSize } = req.query;

  try {
    const response = await axios.get('https://marketcheck-prod.apigee.net/v2/search/car', {
      params: {
        api_key: MARKETCHECK_API_KEY,
        ymmt: `${year}|${make}|${model}`, // Construct the query based on your requirements
        rows: pageSize,
        start: (page - 1) * pageSize,
      },
    });

    const cars = response.data.listings.map(listing => ({
      id: listing.id,
      year: listing.build.year,
      make: listing.build.make,
      model: listing.build.model,
      trim: listing.build.trim,
      price: listing.price,
      // Add more properties as needed
    }));

    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
