import React, { useEffect, useState } from 'react';
import { api } from '../api';
import UserForm from '../components/UserForm';
import Navbar from '../components/Navbar';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Snackbar, Dialog, DialogTitle,
  DialogContent, DialogActions, Paper
} from '@mui/material';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editReservation, setEditReservation] = useState(null);
  const [openReservationDialog, setOpenReservationDialog] = useState(false);

  // Load users data and merge with reservations as before
  const loadUsers = () => {
    api.get('/users')
      .then(response => {
        const users = response.data;
        setUsers(users);
        setError(null);
      })
      .catch(error => {
        console.error('Error loading users:', error);
        setError("Failed to load users. Please try again later.");
      });
  };

  const handleAddUser = (userData) => {
    api.post('/users', userData)
      .then(() => loadUsers())
      .catch(error => {
        console.error('Error adding user:', error);
        setError("Failed to add user. Please try again.");
      });
  };

  const handleUpdateUser = (updatedUser) => {
    api.put(`/users/${updatedUser.userID}`, updatedUser)
      .then(() => {
        loadUsers();
        setOpenEditDialog(false);
        setEditUser(null);
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setError("Failed to update user. Please try again.");
      });
  };

  const handleDeleteUser = (userID) => {
    api.delete(`/users/${userID}`)
      .then(() => loadUsers())
      .catch(error => {
        console.error('Error deleting user:', error);
        setError("Failed to delete user. Please try again.");
      });
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setEditUser(null);
  };

  // Reservation edit & delete handlers
  const handleEditReservationClick = (reservation) => {
    setEditReservation(reservation);
    setOpenReservationDialog(true);
  };

  const handleDeleteReservation = (reservationID) => {
    api.delete(`/reservations/${reservationID}`)
      .then(() => loadUsers())
      .catch(error => {
        console.error('Error deleting reservation:', error);
        setError("Failed to delete reservation. Please try again.");
      });
  };

  const handleCloseReservationDialog = () => {
    setOpenReservationDialog(false);
    setEditReservation(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h3" gutterBottom>User Management</Typography>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
        />

        <Typography variant="h4" gutterBottom>Existing Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <React.Fragment key={user.userID}>
                  <TableRow>
                    <TableCell>{user.userID}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.accountStatus}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditClick(user)}
                        style={{ marginRight: '8px' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteUser(user.userID)}
                        style={{ marginRight: '8px' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Reservations section */}
                  <TableRow>
                    <TableCell colSpan={7} style={{ paddingLeft: '32px', backgroundColor: '#f5f5f5' }}>
                      <Typography variant="h6" gutterBottom>Reserved Room:</Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>Room Name</TableCell>
                            <TableCell>Time Slot</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.reservations && user.reservations.length > 0 ? (
                            user.reservations.map(reservation => (
                              <TableRow key={reservation.libraryReservationID}>
                                <TableCell>{reservation.libraryReservationID}</TableCell>
                                <TableCell>{reservation.libraryRoom?.roomName}</TableCell>
                                <TableCell>{reservation.startTime} - {reservation.endTime}</TableCell>
                                <TableCell>{reservation.status}</TableCell>
                                <TableCell align="center">
                                  
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDeleteReservation(reservation.libraryReservationID)}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5}>No Reservations</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit user dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="md">
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <UserForm
              onSubmit={handleUpdateUser}
              user={editUser}
            />
          </DialogContent>
        </Dialog>

        {/* Edit reservation dialog */}
        <Dialog open={openReservationDialog} onClose={handleCloseReservationDialog} maxWidth="md">
          <DialogTitle>Edit Reservation</DialogTitle>
          <DialogContent>
            {/* Add your reservation edit form here */}
            {/* Example: <ReservationForm onSubmit={handleUpdateReservation} reservation={editReservation} /> */}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default UsersPage;
