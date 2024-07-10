import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';


const AddPatient = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/patients', { name })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding patient:', error);
      });
  };

  return (
    <Container maxWidth="sm">
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Patient
        </Button>
      </form>
    </Paper>
  </Container>
);
};

export default AddPatient;
