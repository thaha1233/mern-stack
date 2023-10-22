import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div dir='rtl'>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/adminDashboard" className="navbar-brand">מומחים ברישום קבלנים PRO</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link id='link-navbar' to="/students" className="nav-link">הסטודנטים</Link>
            </li>
            <li className="nav-item">
              <Link id='link-navbar' to="/ChickStudent1" className="nav-link">בדוק תוקף</Link>
            </li>
            <li className="nav-item">
              <Link id='link-navbar' to="/addstudent" className="nav-link">הוסף תלמיד</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
          <Outlet />

    </div>

  );
}

export default Navbar;
