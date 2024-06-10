import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Company Org Chart</h2>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Employee</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
