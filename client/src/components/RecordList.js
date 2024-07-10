import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/records')
      .then(response => setRecords(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Record List</h1>
      <ul>
        {records.map(record => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;
