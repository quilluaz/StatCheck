import React, { useEffect, useState } from 'react';
import { api } from '../api';
import LibraryRoomReservationForm from '../components/LibraryRoomReservationForm';
import { Container, Typography, List, ListItem, ListItemText, Snackbar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar';

function ReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const loadReservations = () => {
        api.get('/reservations')
           .then(response => {
               setReservations(response.data);
               setError(null);
           })
           .catch(error => {
               console.error("Error fetching reservations:", error);
               setError("Failed to load reservations. Please try again later.");
           });
    };

    const handleDeleteReservation = (reservationID) => {
        api.delete(`/reservations/${reservationID}`)
           .then(() => loadReservations())
           .catch(error => {
               console.error('Error deleting reservation:', error);
               setError("Failed to delete reservation. Please try again.");
           });
    };

    useEffect(() => {
        loadReservations();
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <Typography variant="h2" gutterBottom>Library Room Reservations</Typography>
                <LibraryRoomReservationForm onReservationAdded={loadReservations} />
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                    message={error}
                />
                <Typography variant="h4" gutterBottom>Current Reservations</Typography>
                <List>
                    {reservations.map(reservation => (
                        <ListItem key={reservation.libraryReservationID}>
                            <ListItemText 
                                primary={`${reservation.user?.name || "Unknown User"} reserved ${reservation.libraryRoom?.roomName || "Unknown Room"}`} 
                                secondary={`From: ${reservation.startTime} To: ${reservation.endTime}`} 
                            />
                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteReservation(reservation.libraryReservationID)}>
                                Delete
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Container>

            {/* Edit Reservation Dialog (Optional, but not used anymore) */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Edit Reservation</DialogTitle>
                <DialogContent>
                    <LibraryRoomReservationForm 
                        onReservationAdded={loadReservations} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={() => handleUpdateReservation()} color="primary" variant="contained">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ReservationsPage;
