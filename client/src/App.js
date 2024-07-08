// src/App.js

import React from 'react';
import RecordList from './components/RecordList';
import AddRecord from './components/AddRecord';

const App = () => (
  <div>
    <AddRecord />
    <RecordList />
  </div>
);

export default App;
