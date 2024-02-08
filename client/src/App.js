// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './CarList';
import CarDetail from './CarDetail';
import AddCarForm from './AddCarForm';
import SellCar from './SellCar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/add" element={<AddCarForm />} />
          <Route path="/sell-your-Car" element={<SellCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
