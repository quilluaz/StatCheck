import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Container, TextField, Button, Typography, Snackbar, Box, MenuItem } from '@mui/material';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        phoneNumber: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Set accountStatus to "Active" by default before sending
        const dataToSend = {
            ...formData,
            accountStatus: "Active" // Add default account status
        };
        delete dataToSend.confirmPassword; // Remove confirmPassword before sending

        api.post('/users', dataToSend)
            .then(() => {
                setSuccess("User registered successfully!");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: '',
                    phoneNumber: ''
                });
                setError(null);

                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch(() => setError("Registration failed. Please try again."));
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '10vh',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 280,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                    textAlign: 'center',
                    border: '1px solid #ddd',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Register
                </Typography>

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                />
                <TextField
                    label="Role"
                    name="role"
                    select
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                </TextField>
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    size="small"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Register
                </Button>
            </Box>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                message={error}
            />
            <Snackbar
                open={!!success}
                autoHideDuration={6000}
                onClose={() => setSuccess(null)}
                message={success}
            />
        </Container>
    );
}

export default Register;
    