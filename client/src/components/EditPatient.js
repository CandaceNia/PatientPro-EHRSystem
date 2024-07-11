import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const [patient, setPatient] = useState({
    ssn: '',
    dob: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    reasonForVisit: ''
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };
    fetchPatient();
  }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatient({ ...patient, [name]: value });
//   };
const handleChange = (event) => {
    setName(event.target.value); // Ensure event.target.value is defined
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3001/patients/${id}`, patient);
//       history.push('/');
//     } catch (error) {
//       console.error('Error updating patient:', error);
//     }
//   };
const handleSubmit = (event) => {
    event.preventDefault();
    // Example logic to update patient
    if (name.trim() !== '') {
      // Perform update logic here
      console.log('Updating patient with name:', name);
      navigate('/patients'); // Navigate to /patients route
    } else {
      console.log('Name cannot be empty');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Edit Patient Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SSN"
              name="ssn"
              value={patient.ssn}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
           
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={patient.dob}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={patient.firstName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
           
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={patient.middleName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={patient.lastName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={patient.address}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={patient.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason for Visit"
              name="reasonForVisit"
              value={patient.reasonForVisit}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditPatient;
