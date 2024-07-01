import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4040/dashboard/category');
        setCategories(response.data); 
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setLoading(false);
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs once after initial render

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:4040/dashboard/category/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category');
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Department List</h3>
        <Link to="add-category" className="btn btn-success">
          Add Department
        </Link>
      </div>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
            <h5>{category.category}</h5>
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => deleteCategory(category._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
