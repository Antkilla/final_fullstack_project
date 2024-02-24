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
  console.log("middleware");
  next()
});

//get all dealerships
app.get("/api/v1/getdealership", (req, res) => {
  console.log("route handler hit")
  res.status(200).json({
    status: "success",
    data: {
      dealership: ["best auto dealer", "auto sports"],
    },
  });
});

//get a individual dealership
app.get("/api/v1/getdealership/:id", (req, res) => {
  console.log(req.params);
});

//create dealership
app.post("/api/v1/getdealership", (req, res) => {
  console.log(req);
});




//SETUP DATABASE CONNECTION
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cars',
  password: process.env.DB_PASSWORD,
  port: 5432
});

// START THE SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});