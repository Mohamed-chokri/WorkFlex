import React from "react";
import Login from "./components/Login";
import ProtectedRoute from './components/Auth'; 
import Home from './components/Home'
import Category from './components/dashboard/Category'
import Manage from './components/dashboard/Manage'
import Profiles from './components/dashboard/Profiles'
import Logout from './components/dashboard/Logout'
import AddCategory from "./components/dashboard/Add_category";
import AddEmployee from "./components/dashboard/Add-employee";
import EditEmployee from "./components/dashboard/Edit-employee";
import Register from "./components/Register";
import Vacation from "./components/dashboard/Vacation";


import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashbord"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } >
          <Route path="" element={<Home/>}></Route>
          <Route path="manage" element={<Manage/>}></Route>
          <Route path="profile" element={<Profiles/>}></Route>
          <Route path="logout" element={<Logout/>}></Route>
          <Route path="category" element={<Category/>}></Route>
          <Route path="category/add-category" element={<AddCategory/>}></Route>
          <Route path="manage/add-employee" element={<AddEmployee/>}></Route>
          <Route path="manage/edit-employee/:id" element={<EditEmployee/>}></Route>
          <Route path="vacation" element={<Vacation/>}></Route>



          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
