import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ScheduleComponent from './components/Schedule/ScheduleComponent';
import SubjectComponent from './components/Subject/SubjectComponent';
import TimeSlotComponent from './components/TimeSlot/TimeSlotComponent';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Schedule Management
          </Typography>
          <Grid container spacing={3}>
  
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                <ScheduleComponent />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <SubjectComponent />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <TimeSlotComponent />
              </Paper>
            </Grid>
          </Grid>
        
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;