const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userroute = require('./routeur/users');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SM')
  .then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api/auth', userroute); 
app.use('/', userroute); 
app.use('/dashboard/category/add-category', userroute); 
app.use('/dashboard/category' , userroute );
app.use('/dashboard/manage/add-employee', userroute); 
app.use('/dashboard/manage', userroute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/dashboard/manage/edit-employee/:id',userroute );
app.use('/dashboard/manage/:id',userroute );
app.use('/dashboard',userroute );//count user
app.get('/dashboard/profile', userroute);
app.delete('/dashboard/category/:id', userroute);

module.exports = app;
