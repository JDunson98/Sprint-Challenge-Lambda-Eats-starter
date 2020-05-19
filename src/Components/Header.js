import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Header() {
    return (
        <div className="header">
            <Link to={`/`}><button>Home</button></Link>
            <Link to={`/pizza`}><button>Get Started</button></Link>
        </div>
    )
}

export default Header;