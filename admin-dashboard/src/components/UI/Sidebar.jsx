import React from 'react'
import { NavLink } from 'react-router';
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-component">
        <div className="sidebar-title">
            <i className="fa-solid fa-border-all"></i>
            <span>Admin</span>
        </div>

        <div className='sidebar'>
              <div className='sidebar-item'>
                <i className="fa-solid fa-house"></i> 
                <NavLink to="/dashboard">Dashboard</NavLink>
              </div>
              <div className='sidebar-item'>
                <i className="fa-solid fa-tag"></i>
                <NavLink to="category">Categories</NavLink>
              </div>
              <div className='sidebar-item'>
                <i className="fa-regular fa-clipboard"></i>
                <NavLink to="product">Products</NavLink>
              </div>
              <div className='sidebar-item'>
                <i className="fa-solid fa-bag-shopping"></i>
                <NavLink to="orders">Orders</NavLink>
              </div>
        </div>
    </div>
  )
}

export default Sidebar;