import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

  return (
    <div>
      <h1>Patient List</h1>
      <Link to="/add-patient">Add Patient</Link>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name}
            <button onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button>
            <button onClick={() => deletePatient(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
