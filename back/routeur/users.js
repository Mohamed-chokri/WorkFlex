const express = require("express");
const multer = require('multer');
const router = express.Router();
const userCtrl = require("../controleurs/uesersCON"); 
const regisctrl = require("../controleurs/register"); 
const addcat = require ("../controleurs/category")
const Category = require('../models/category'); 
const employeeController = require('../controleurs/employee');
const getemployee = require('../controleurs/getemployee');
const editemployee = require('../controleurs/editemployee')
const upload = multer({ dest: './images' }); 
const count =require('../controleurs/count');
const grantTimeOff = require('../controleurs/timeoffController');
const getTimeOff = require('../controleurs/timeoffController');
const categoryController =require('../controleurs/category')



router.post("/register", regisctrl.register); 
router.post("/login", userCtrl.login);
router.post("/dashboard/category/add-category", addcat.postCategory);
router.post('/dashboard/manage/add-employee', employeeController.addEmployee);
router.get('/dashboard/category', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
router.get('/dashboard/manage', getemployee.getEmployees);
router.get('/dashboard/manage/edit-employee/:id', editemployee.getEmployeeById);
router.put('/dashboard/manage/edit-employee/:id', upload.single('avatar'), editemployee.updateEmployeeById);
router.delete('/dashboard/manage/:id', editemployee.deleteEmployeeById);
router.get('/dashboard' , count.getEmployeeCount)
router.get('/dashboard/salary' , count.getTotalSalary)
router.post('/dashboard/profile', grantTimeOff.grantTimeOff);
router.get('/dashboard/profile', getTimeOff.getTimeOff);
router.delete('/dashboard/category/:id', categoryController.deleteCategory);


module.exports = router;
