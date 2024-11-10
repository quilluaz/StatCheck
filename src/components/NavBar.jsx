// src/components/NavBar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    StatCheck
                </Typography>
                <Button color="inherit" component={Link} to="/users">
                    Users
                </Button>
                <Button color="inherit" component={Link} to="/reservations">
                    Reservations
                </Button>
                <Button color="inherit" component={Link} to="/rooms">
                    Library Rooms
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
