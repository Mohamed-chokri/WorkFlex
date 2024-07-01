import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
const Manage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard/manage');
        setEmployees(response.data); 
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setLoading(false);
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []); 

  if (loading) {
    return <p className="text-center mt-5">Loading employees...</p>;
  }

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/dashboard/manage/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
      setError('Failed to delete employee');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading employees...</p>;
  }

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Employee List</h3>
        <Link to="add-employee" className="btn btn-success">
          Add Employee
        </Link>
      </div>
      <div className="row">
        {employees.map((e) => (
          <div key={e._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`http://localhost:4040/images/${e.avatar}`}
                className="card-img-top employee-image"
                alt={e.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text"><strong>Email:</strong> {e.email}</p>
                <p className="card-text"><strong>Position:</strong> {e.position}</p>
                <p className="card-text"><strong>Salary:</strong> {e.salary}</p>
                <p className="card-text"><strong>Department:</strong> {e.category}</p>
                <Link to={`edit-employee/${e._id}`} className='btn btn-info btn-sm me-2'>edit</Link>
                <button onClick={() => handleDelete(e._id)} className='btn btn-warning btn-sm'>delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
