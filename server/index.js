//ALL IMPORT STAEMENTS
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const morgan = require("morgan");
require('dotenv').config();

//INITIALIZE THE EXPRESS APP
const app = express();

//MIDDELWARE THAT IS NEEDED TO CONNECT TO THE FRONT AND BACK END
app.use(cors());
app.use(express.json());

//get all dealerships
app.get("/api/v1/dealership", async (req, res) => {
  const results = await db.query("select * from dealership")
  console.log(results);
  res.status(200).json({
    status: "success",
    data: {
      dealership: ["best auto dealer", "auto sports"],
    },
  });
});

//get a individual dealership
app.get("/api/v1/dealership/:id", (req, res) => {
  console.log(req.params);
});

//create dealership
app.post("/api/v1/dealership", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      dealership: "auto sports", 
    },
  });
});

//UPDATE DEALERSHIP
app.put("/api/v1/dealership/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
    res.status(200).json({
      status: "success",
      data: {
        dealership: "auto sports",
      },
    })
});
  
//DELETE DEALERSHIP
app.delete("/api/v1/dealership/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  })
});

//SETUP DATABASE CONNECTION
const pool = new Pool();
const db = {
  query: (text, params) => pool.query(text, params),
};

// START THE SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});