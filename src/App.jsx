// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import UsersPage from './pages/UsersPage';
import LibraryRoomsPage from './pages/LibraryRoomsPage';
import ReservationsPage from './pages/ReservationsPage';
import Login from './pages/Login'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/rooms" element={<LibraryRoomsPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
