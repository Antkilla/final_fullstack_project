// src/components/CarDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EditCarForm from './EditCarForm';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cars/${id}`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Error fetching car details:', error));
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCarUpdated = () => {
    // Reload car details after an update
    setIsEditing(false);
    axios.get(`http://localhost:5000/api/cars/${id}`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Error fetching car details:', error));
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      // Handle successful deletion, e.g., redirect to car list
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{`${car.year} ${car.make} ${car.model}`}</h1>
      <p>Price: ${car.price}</p>
      {isEditing ? (
        <EditCarForm carId={id} onCancel={handleCancelEdit} onCarUpdated={handleCarUpdated} />
      ) : (
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      <Link to="/">Back to Car List</Link>
    </div>
  );
};

export default CarDetail;
