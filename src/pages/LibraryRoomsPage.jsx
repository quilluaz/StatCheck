import React, { useEffect, useState } from 'react';
import { api } from '../api';
import LibraryRoomForm from '../components/LibraryRoomForm';
import NavBar from '../components/NavBar';
import { Container, Typography, List, ListItem, ListItemText, Snackbar, Button } from '@mui/material';

function LibraryRoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);

    const loadRooms = () => {
        api.get('/rooms')
            .then(response => {
                setRooms(response.data);
                setError(null);
            })
            .catch(error => {
                console.error("Error fetching library rooms:", error);
                setError("Failed to load library rooms. Please try again later.");
            });
    };

    const handleDelete = (roomID) => {
        api.delete(`/rooms/${roomID}`)
            .then(() => loadRooms())
            .catch(error => {
                console.error("Error deleting library room:", error);
                setError("Failed to delete library room. Please try again.");
            });
    };

    const handleEdit = (room) => {
        setEditingRoom(room); // Set the room to be edited
    };

    const handleRoomUpdated = (updatedRoom) => {
        api.put(`/rooms/${updatedRoom.libraryRoomID}`, updatedRoom)
            .then(() => {
                loadRooms();
                setEditingRoom(null); // Reset editing state after update
            })
            .catch(error => {
                console.error('Error updating library room:', error);
                setError("Failed to update library room. Please try again.");
            });
    };

    useEffect(() => {
        loadRooms();
    }, []);

    return (
        <>
            <NavBar />
            <Container>
                <Typography variant="h2" gutterBottom>Library Rooms</Typography>
                <LibraryRoomForm 
                    onRoomAdded={loadRooms} 
                    onRoomEdited={handleRoomUpdated} 
                    editingRoom={editingRoom} 
                />
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                    message={error}
                />
                <Typography variant="h4" gutterBottom>Existing Library Rooms</Typography>
                <List>
                    {rooms.map(room => (
                        <ListItem key={room.libraryRoomID}>
                            <ListItemText 
                                primary={`Room ID: ${room.libraryRoomID} - ${room.roomName}`} 
                                secondary={`Booking Status: ${room.bookingStatus} - Available Time Slots: ${room.availableTimeSlots.join(', ')}`} 
                            />
                            <Button variant="outlined" color="primary" onClick={() => handleEdit(room)}>Edit</Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(room.libraryRoomID)}>Delete</Button>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
}

export default LibraryRoomsPage;
