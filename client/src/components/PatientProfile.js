import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Profile
        </Typography>
        <Typography variant="h6">Name: {patient.name}</Typography>
        {/* Display other patient details as needed */}
        
        {/* Doctor Visits Section */}
        <Typography variant="h5" style={{ marginTop: '20px' }}>Doctor Visits:</Typography>
        <List>
          {patient.doctorVisits && patient.doctorVisits.map((visit, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Date: ${visit.date}`} secondary={`Reason: ${visit.reason}`} />
            </ListItem>
          ))}
        </List>

        {/* File Uploads Section */}
        <Typography variant="h5" style={{ marginTop: '20px' }}>File Uploads:</Typography>
        <List>
          {patient.fileUploads && patient.fileUploads.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={`File Name: ${file.fileName}`} secondary={`Uploaded on: ${file.uploadDate}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PatientProfile;
