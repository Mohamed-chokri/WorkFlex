import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Form, Button, Alert } from 'react-bootstrap';

const GrantTimeOff = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [leaveType, setLeaveType] = useState('vacation');
  const [dates, setDates] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard/manage');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://localhost:4040/dashboard/profile', {
        employeeId: selectedEmployee,
        leaveType,
        dates,
      });
      setMessage('Time off granted successfully');
    } catch (error) {
      console.error('Error granting time off:', error);
      setError('Failed to grant time off');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Grant Time Off</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="employeeSelect">
          <Form.Label>Select Employee</Form.Label>
          <Form.Control
            as="select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="leaveType">
          <Form.Label>Leave Type</Form.Label>
          <Form.Control
            as="select"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="vacation">Vacation</option>
            <option value="sick">Sick Leave</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="calendar">
          <Form.Label>Select Dates</Form.Label>
          <Calendar
            selectRange
            onChange={(value) => setDates(value)}
            value={dates}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Grant Time Off
        </Button>
      </Form>
    </div>
  );
};

export default GrantTimeOff;
