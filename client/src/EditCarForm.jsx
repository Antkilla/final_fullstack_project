// src/EditCarForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCarForm = ({ carId, onCancel, onCarUpdated }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Fetch car details when the form component mounts
    axios.get(`http://localhost:5000/api/cars/${carId}`)
      .then(response => {
        const carData = response.data;
        setMake(carData.make);
        setModel(carData.model);
        setYear(carData.year);
        setPrice(carData.price);
      })
      .catch(error => console.error('Error fetching car details:', error));
  }, [carId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/cars/${carId}`, {
        make,
        model,
        year,
        price,
      });

      // Notify parent component that car has been updated
      onCarUpdated();
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
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
        <button type="submit">Update Car</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCarForm;
