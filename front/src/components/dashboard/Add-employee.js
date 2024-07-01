import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEmployee = () => {
  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/dashboard/category"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("position", employee.position);
      formData.append("salary", employee.salary);
      formData.append("category", employee.category);
      formData.append("avatar", image); 

       await axios.post(
        "http://localhost:4040/dashboard/manage/add-employee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Employee added successfully");
      setError("");
      setEmployee({
        name: "",
        email: "",
        position: "",
        salary: "",
        category: "",
      });
      setImage(null); 
      setTimeout(() => {
        setMessage("");
        navigate("/dashboard/manage");
      }, 100);
    } catch (err) {
      console.error("Error adding employee:", err);
      setError("Failed to add employee");
      setMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Add Employee</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                    placeholder="full name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    required
                    placeholder="position"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                    placeholder="salary"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="category">Department</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={employee.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a Department</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="avatar">Select Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
