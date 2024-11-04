import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Buildings from '../pages/buildings';
import Rooms from '../pages/rooms';

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/buildings" />} />
        <Route path="/buildings" element={<Buildings />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
