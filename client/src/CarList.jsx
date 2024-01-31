// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30; // Set the desired number of results per page

  useEffect(() => {
    // Fetch all cars initially
    fetchCars();
  }, [currentPage]); // Re-fetch data when the currentPage changes

  const fetchCars = () => {
    // Fetch cars based on the search term and pagination
    axios.get(`http://localhost:5000/api/cars/search?term=${searchTerm}&page=${currentPage}&pageSize=${pageSize}`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when performing a new search
    fetchCars();
  };

  const handleFilter = (filterTerm) => {
    setCurrentPage(1); // Reset to the first page when applying a filter
    // Fetch cars based on the selected filter term
    axios.get(`http://localhost:5000/api/cars/filter?term=${filterTerm}`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error filtering cars:', error));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Car Listings</h1>
      <div>
        <input
          type="text"
          placeholder="Search by make, model, or year"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button onClick={() => handleFilter('Toyota')}>Filter Toyota</button>
        <button onClick={() => handleFilter('Honda')}>Filter Honda</button>
        {/* Add more filter options as needed */}
      </div>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <p>{`${car.year} ${car.make} ${car.model} - $${car.price}`}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span> Page {currentPage} </span>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CarList;
