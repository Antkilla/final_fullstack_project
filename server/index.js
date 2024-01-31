const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

const sequelize = new Sequelize('car_listing_db', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Car = sequelize.define('Car', {
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

sequelize.sync();

app.get('/api/cars', async (req, res) => {
  const cars = await Car.findAll();
  res.json(cars);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
