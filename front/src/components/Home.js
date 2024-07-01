import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeCountResponse = await axios.get('http://localhost:4040/dashboard');
        const totalSalaryResponse = await axios.get('http://localhost:4040/dashboard/salary');
        const categoriesResponse = await axios.get('http://localhost:4040/dashboard/category');
        
        setEmployeeCount(employeeCountResponse.data.count);
        setTotalSalary(totalSalaryResponse.data.totalSalary);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the Employee Management System</h1>
        <p className="lead text-center">Manage your employees and categories efficiently.</p>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Employees</h3>
              <p className="card-text"><h5>{employeeCount}</h5></p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total Salary</h3>
              <p className="card-text"><h5>${totalSalary}</h5></p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
            <h3 className="card-title">Department</h3>
              <div className="category-list">
                {categories.map(category => (
                  <span key={category._id} className="badge bg-secondary me-2">{category.category}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
