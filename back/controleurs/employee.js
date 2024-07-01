const multer = require("multer");
const path = require("path");
const Employee = require("../models/employee"); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images")); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage });

exports.addEmployee = [
  upload.single('avatar'),
  async (req, res) => {
    try {
      const { name, email, position, salary, category } = req.body;
      const avatar = req.file ? req.file.filename : null;

      const newEmployee = new Employee({
        name,
        email,
        position,
        salary,
        category,
        avatar,
      });

      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({ error: "Failed to add employee" });
    }
  }
];
