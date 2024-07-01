const Employee = require('../models/employee');
const fs = require('fs');
const path = require('path');

exports.getEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      console.error('Error fetching employee:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updateEmployeeById = async (req, res) => {
    try {
      const updateData = {
        name: req.body.name,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        category: req.body.category,
      };
  
      if (req.file) {
        updateData.avatar = req.file.path; 
      }
  
      const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, {
        new: true, 
      });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json(employee);
    } catch (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.deleteEmployeeById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      
      if (employee.avatar) {
        // Delete avatar file
        const avatarPath = path.join(__dirname, '..', employee.avatar);
        fs.unlink(avatarPath, (err) => {
          if (err) {
            console.error(`Error deleting avatar: ${err}`);
          }
        });
      }
  
      await Employee.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };