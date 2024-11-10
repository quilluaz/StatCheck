import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function UserForm({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    status: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user); // Populate form with existing user data for update
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Submit form with the current data
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2, maxWidth: 400 }}>
      <Box sx={{ marginTop: 1 }}></Box>
      <TextField
        label="Name"    
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          label='Role'
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="Active">Student</MenuItem>
          <MenuItem value="Inactive">Teacher</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label='Status'
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      {/* Remove the extra button, display only Save Changes */}
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}

export default UserForm;
