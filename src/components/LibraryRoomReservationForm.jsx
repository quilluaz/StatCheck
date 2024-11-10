// src/components/LibraryRoomReservationForm.jsx

import React, { useState } from 'react';
import { api } from '../api';

function LibraryRoomReservationForm({ onReservationAdded }) {
    const [userID, setUserID] = useState('');
    const [libraryRoomID, setLibraryRoomID] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [reservationStatus, setReservationStatus] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/reservations', {
                user: { userID },
                libraryRoom: { libraryRoomID },
                startTime,
                endTime,
                reservationStatus
            });
            onReservationAdded();
            setUserID('');
            setLibraryRoomID('');
            setStartTime('');
            setEndTime('');
            setReservationStatus('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error adding reservation:", error);
            setError("Failed to add reservation. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
            <input
                type="number"
                placeholder="User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Library Room ID"
                value={libraryRoomID}
                onChange={(e) => setLibraryRoomID(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Reservation Status"
                value={reservationStatus}
                onChange={(e) => setReservationStatus(e.target.value)}
                required
            />
            <button type="submit">Add Reservation</button>
        </form>
    );
}

export default LibraryRoomReservationForm;
