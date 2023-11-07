import React from 'react';
import { Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import 'react-simple-toasts/dist/theme/success.css';
import 'react-simple-toasts/dist/theme/failure.css';

import CarsList from "./features/CarsList";
import AddCar from "./features/AddCar";
import EditCar from "./features/EditCar"; 
import ViewCar from "./features/ViewCar";

import car from "./assets/car.png";

import './App.css';

function App() {
  return (
    <div>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/cars" className="navbar-brand">
          <img src={car} className="car-styles" width="150" />
        </a>
        <div className='create-car-text-container'> 
          <h1 className="create-car-text">Create Car Feature(s)</h1>
        </div>
        
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/:carId" element={<EditCar />} />
          <Route path="/cars/:carId/view" element={<ViewCar />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;

/* 
To Do:
-----
- Testing
- Split form into input and select components
- Add 'No cars found' message to the table
- Make car animation responsive
- Implement auto-suggestion for brand and model if there is time
*/
