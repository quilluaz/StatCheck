import React, { useEffect, useState } from 'react';
import { fetchParkingLots, createReservation, fetchReservations, updateReservation, deleteReservation } from '../api';

const Reservation = () => {
    const [parkingLots, setParkingLots] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState({
        parkingLot: { lotId: '' },
        reservationStartTime: '',
        reservationEndTime: '',
    });
    const [editingReservation, setEditingReservation] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadParkingLots = async () => {
            try {
                const response = await fetchParkingLots();
                setParkingLots(response.data);
            } catch (err) {
                setError('Failed to load parking lots.');
            }
        };

        const loadReservations = async () => {
            try {
                const response = await fetchReservations();
                setReservations(response.data);
            } catch (err) {
                setError('Failed to load reservations.');
            }
        };

        loadParkingLots();
        loadReservations();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const now = new Date().toISOString();
            try {
                const expiredReservations = reservations.filter(res => res.reservationEndTime < now);
                for (const expiredReservation of expiredReservations) {
                    await deleteReservation(expiredReservation.reservationId);
                }
                setReservations(reservations.filter(res => res.reservationEndTime >= now));
            } catch (err) {
                setError('Failed to delete expired reservations.');
            }
        }, 60000); 
        return () => clearInterval(interval); 
    }, [reservations]);

    const handleCreateOrUpdateReservation = async () => {
        if (!reservation.parkingLot.lotId || !reservation.reservationStartTime || !reservation.reservationEndTime) {
            setError('Please fill in all fields.');
            return;
        }
        setError(''); 
        try {
            if (editingReservation) {
                const response = await updateReservation(editingReservation.reservationId, reservation);
                setReservations(reservations.map(res => (res.reservationId === editingReservation.reservationId ? response.data : res)));
                setMessage('Reservation updated successfully!');
            } else {
                const response = await createReservation(reservation);
                setReservations([...reservations, response.data]);
                setMessage('Reservation created successfully!');
            }
            setReservation({
                parkingLot: { lotId: '' },
                reservationStartTime: '',
                reservationEndTime: '',
            });
            setEditingReservation(null); 
        } catch (err) {
            setError('Failed to save reservation.');
        }
    };

    const handleEditClick = (res) => {
        setEditingReservation(res);
        setReservation({
            parkingLot: { lotId: res.parkingLot.lotId },
            reservationStartTime: res.reservationStartTime,
            reservationEndTime: res.reservationEndTime,
        });
    };

    const handleDeleteReservation = async (id) => {
        try {
            await deleteReservation(id);
            setReservations(reservations.filter(res => res.reservationId !== id));
        } catch (err) {
            setError('Failed to delete reservation.');
        }
    };

    const currentDateTime = new Date().toISOString().slice(0, 16);

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <h1>{editingReservation ? 'Edit Reservation' : 'Create Reservation'}</h1>
            <select
                value={reservation.parkingLot.lotId}
                onChange={(e) => setReservation({ ...reservation, parkingLot: { lotId: e.target.value } })}
                style={{ margin: '5px' }}
            >
                <option value="">Select Parking Lot</option>
                {parkingLots.map(lot => (
                    <option key={lot.lotId} value={lot.lotId}>{lot.lotNumber}</option>
                ))}
            </select>
            <input
                type="datetime-local"
                value={reservation.reservationStartTime}
                onChange={(e) => setReservation({ ...reservation, reservationStartTime: e.target.value })}
                min={currentDateTime}
                style={{ margin: '5px' }}
                required
            />
            <input
                type="datetime-local"
                value={reservation.reservationEndTime}
                onChange={(e) => setReservation({ ...reservation, reservationEndTime: e.target.value })}
                min={reservation.reservationStartTime || currentDateTime}
                style={{ margin: '5px' }}
                required
            />
            <button onClick={handleCreateOrUpdateReservation}>
                {editingReservation ? 'Update Reservation' : 'Create Reservation'}
            </button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <h2>Existing Reservations</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {reservations.map(res => (
                    <li key={res.reservationId} style={{ margin: '10px 0' }}>
                        {res.parkingLot.lotNumber} - {new Date(res.reservationStartTime).toLocaleString()} to {new Date(res.reservationEndTime).toLocaleString()}
                        <button onClick={() => handleEditClick(res)} style={{ marginLeft: '10px' }}>Edit</button>
                        <button onClick={() => handleDeleteReservation(res.reservationId)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservation;
