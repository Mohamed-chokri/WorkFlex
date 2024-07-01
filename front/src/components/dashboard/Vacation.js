import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const TimeOffList = () => {
  const [timeOffList, setTimeOffList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeOff = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard/profile');
        setTimeOffList(response.data);
      } catch (error) {
        console.error('Error fetching time off:', error);
        setError('Failed to fetch time off');
      }
    };

    fetchTimeOff();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Time Off List</h2>
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {timeOffList.map((timeOff) => (
            <tr key={timeOff._id}>
              <td>{timeOff.employee.name}</td>
              <td>{timeOff.leaveType}</td>
              <td>{new Date(timeOff.dates[0]).toLocaleDateString()}</td>
              <td>{new Date(timeOff.dates[1]).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TimeOffList;
