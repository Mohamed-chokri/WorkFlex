import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [success , setsuccess] =useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4040/dashboard/category/add-category", { category: categoryName });
      console.log('Category added:', response.data);
      // Clear the input after submit
      setCategoryName('');
      setError(null);
      setsuccess('Category added successfully');
      setTimeout(() => {setsuccess()}, 1500);
      navigate('/dashboard/category')
      
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Error adding category');
      setsuccess(null);
      setTimeout(() => {setError()}, 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Add Department</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="categoryName">Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    value={categoryName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block">
                  Add Department
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
