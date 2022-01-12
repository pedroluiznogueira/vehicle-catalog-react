import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        window.sessionStorage.clear();
        navigate('/login');
    }

    return(
        <nav className="navbar">
            <div className="logo-block">
                <h1 className="logo">Vehicle Catalog</h1>
            </div>
            <div className="logout-block">
                <h1 onClick={handleLogout} className="logout">Logout</h1>
            </div>
        </nav>
    );
}

export default Navbar;