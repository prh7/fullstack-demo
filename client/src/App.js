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

const NotFound = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center"}}>Page Not Found</h1>
    </div>
  );
}

const App = () => {
  return (
    <div>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/cars" className="navbar-brand">
          <img src={car} className="car-styles" width="150" alt="car"/>
        </a> 
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CarsList />} />
          <Route path="/cars" element={<CarsList />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/:carId" element={<EditCar />} />
          <Route path="/cars/:carId/view" element={<ViewCar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;

/* 
To Do:
-----
- Testing- Form and Car slice
- Small documentation
- Remeber to remove git setup from project
*/
