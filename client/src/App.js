import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientProfile from './components/PatientProfile';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              PatientPro
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/add-patient">
              Add Patient
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/edit-patient/:id" element={<EditPatient />} />
          <Route path="/patient-profile/:id" element={<PatientProfile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
