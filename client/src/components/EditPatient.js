import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

const EditPatient = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/patients/${id}`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching patient:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/patients/${id}`, { name })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating patient:', error);
      });
  };

  return (
    <Container maxWidth="sm">
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Patient
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
          Update Patient
        </Button>
      </form>
    </Paper>
  </Container>
);
};


export default EditPatient;
