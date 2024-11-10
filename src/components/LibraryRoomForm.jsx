import React, { useState, useEffect } from 'react';
import { api } from '../api';

function LibraryRoomForm({ onRoomAdded, onRoomEdited, editingRoom }) {
    const [roomName, setRoomName] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        if (editingRoom) {
            setRoomName(editingRoom.roomName);
            setAvailableTimeSlots(editingRoom.availableTimeSlots.join(', '));
            setBookingStatus(editingRoom.bookingStatus);
        } else {
            setRoomName('');
            setAvailableTimeSlots('');
            setBookingStatus('');
        }
    }, [editingRoom]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRoom) {
                await api.put(`/rooms/${editingRoom.libraryRoomID}`, {
                    roomName,
                    availableTimeSlots: availableTimeSlots.split(',').map(slot => slot.trim()), 
                    bookingStatus
                });
                onRoomEdited(); // Notify parent that room has been edited
            } else {
                await api.post('/rooms', {
                    roomName,
                    availableTimeSlots: availableTimeSlots.split(',').map(slot => slot.trim()), 
                    bookingStatus
                });
                onRoomAdded(); // Refresh room list
            }

            // Reset form fields
            setRoomName('');
            setAvailableTimeSlots('');
            setBookingStatus('');
        } catch (error) {
            console.error("Error adding or updating library room:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Room Name:
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                />
            </label>
            <label>
                Available Time Slots (comma-separated):
                <input
                    type="text"
                    placeholder="09:00 - 10:00, 10:00 - 11:00"
                    value={availableTimeSlots}
                    onChange={(e) => setAvailableTimeSlots(e.target.value)}
                    required
                />
            </label>
            <label>
                Booking Status:
                <select
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.target.value)}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="maintenance">Under Maintenance</option>
                </select>
            </label>
            <button type="submit">{editingRoom ? 'Update Room' : 'Add Room'}</button>
        </form>
    );
}

export default LibraryRoomForm;
