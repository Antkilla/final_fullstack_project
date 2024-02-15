//ALL IMPORT STAEMENTS
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

//INITIALIZE THE EXPRESS APP
const app = express();

//MIDDELWARE THAT IS NEEDED TO CONNECT TO THE FRONT AND BACK END
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'connect-src http://localhost:3000 http://localhost:3001');
  next();
});

//SETUP DATABASE CONNECTION
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cars',
  password: process.env.DB_PASSWORD,
  port: 5432
});

// ROUTE TO GET ALL CARS INFO FROM DATABASE USING YOUR API NOT AN EXTERNAL ONE 
app.get('/api/cars/search', async (req, res) => {
  const { term, make, model, year, page, pageSize } = req.query;
  // Check if page or pageSize are not valid numbers
  if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
    return res.status(400).json({ error: 'Invalid page or pageSize parameters.' });
  }

  try {
    const result = await pool.query(`
      SELECT * FROM vehiclemodelyear
      WHERE
        make ILIKE $1
        AND model ILIKE $2
        AND (year::TEXT ILIKE $3 OR year = TRY_CAST($3 AS BIGINT))
      LIMIT $4 OFFSET $5;
    `, [`%${make}%`, `%${model}%`, `%${year}%`, pageSize, (page - 1) * pageSize]);
  
    const cars = result.rows;

    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
});

// START THE SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});