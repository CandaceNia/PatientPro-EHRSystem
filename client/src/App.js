import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/edit-patient/:id" element={<EditPatient />} />
      </Routes>
    </Router>
  );
}

export default App;
