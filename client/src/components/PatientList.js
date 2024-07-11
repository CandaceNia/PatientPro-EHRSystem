import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const deletePatient = (id) => {
    axios.delete(`http://localhost:3001/patients/${id}`)
      .then(response => {
        setPatients(patients.filter(patient => patient.id !== id));
      })
      .catch(error => {
        console.error('Error deleting patient:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <Link to={`/patient-profile/${patient.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {patient.name}
              </Link>
            </TableCell>
            <TableCell align="right">
              <Button component={Link} to={`/edit-patient/${patient.id}`} variant="contained" color="primary">
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(patient.id)}
                variant="contained"
                color="secondary"
                style={{ marginLeft: '10px' }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
};


export default PatientList;
