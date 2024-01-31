// src/AddCarForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCarForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState(0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/cars', {
        make,
        model,
        year,
        price,
      });

      // Redirect or handle success as needed
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div>
      <h1>Add a Car</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </label>
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm;
