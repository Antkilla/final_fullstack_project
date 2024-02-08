// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CarList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [makeFilter, setMakeFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [newPage, setNewPage] = useState(1);
  const pageSize = 30;

  useEffect(() => {
    // Fetch cars based on the search term, filters, and pagination
    fetchCars();
  }, [location.search, newPage]);

  const fetchCars = () => {
    const params = new URLSearchParams(location.search);
    const searchTermParam = params.get('searchTerm') || '';
    const makeParam = params.get('make') || '';
    const modelParam = params.get('model') || '';
    const yearParam = params.get('year') || '';
    const pageParam = params.get('page') || 1;

    setSearchTerm(searchTermParam);
    setMakeFilter(makeParam);
    setModelFilter(modelParam);
    setYearFilter(yearParam);
    setNewPage(pageParam);

    axios.get(`http://localhost:5000/api/cars/search?term=${searchTermParam}&make=${makeParam}&model=${modelParam}&year=${yearParam}&page=${pageParam}&pageSize=${pageSize}`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  const handleSearch = () => {
    setNewPage(1);
    updateURL();
  };

  const handleFilter = (make, model, year) => {
    setNewPage(1);
    setMakeFilter(make);
    setModelFilter(model);
    setYearFilter(year);
    updateURL(1);
  };

  const handlePageChange = (newPage) => {
    setNewPage(newPage);
    updateURL();
  };

  const updateURL = (newPage) => {
    const params = new URLSearchParams();
    params.set('searchTerm', searchTerm);
    params.set('make', makeFilter);
    params.set('model', modelFilter);
    params.set('year', yearFilter);
    params.set('page', newPage);

    navigate(`?${params.toString()}`);
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
        <button onClick={() => handleFilter('Toyota', '', '')}>Filter Toyota</button>
        <button onClick={() => handleFilter('Honda', '', '')}>Filter Honda</button>
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
        <button onClick={() => handlePageChange(newPage - 1)} disabled={newPage === 1}>
          Previous Page
        </button>
        <span> Page {newPage} </span>
        <button onClick={() => handlePageChange(newPage + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CarList;
