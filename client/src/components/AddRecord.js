// src/components/AddRecord.js

import React, { useState } from 'react';
import axios from 'axios';

const AddRecord = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/records', { name, age, diagnosis })
      .then(response => console.log(response.data))
      .catch(error => console.error('Error adding record:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        required
      />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default AddRecord;
