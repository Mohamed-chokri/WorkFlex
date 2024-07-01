import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <nav className='bg-dark col-auto col-md-2 min-vh-100'>
          <span className='fw-bolder d-none d-sm-inline fs-5 text-white'>WorkFlex</span>
          <div className='position-sticky'>
            <ul className='nav flex-column'>
              <li className='nav-item'>
                <Link to="/dashboard" className='nav-link text-white'>
                  <i className="bi bi-house-door"></i> Dashboard
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/manage" className='nav-link text-white'>
                  <i className="bi bi-gear"></i> Manage Employee
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/category" className='nav-link text-white'>
                  <i className="bi bi-list"></i> Department
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/profile" className='nav-link text-white'>
                  <i className="bi bi-person"></i> Grant Time Off
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/vacation" className='nav-link text-white'>
                  <i className="bi bi-ban-fill"></i> Vacation
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/logout" className='nav-link text-white'>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'><h1 className='h2'>Dashboard</h1></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
