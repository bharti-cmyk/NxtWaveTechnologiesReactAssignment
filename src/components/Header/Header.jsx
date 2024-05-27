import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'
const Header = () => {
  const location = useLocation();
  return (
    <div className='add-header'>
        <header className="header">
            <span><img src = 'https://asset.brandfetch.io/idIfKGA02M/idtnhGWBAZ.jpeg'/></span>
            {location.pathname === '/' && (
                <Link to="/add-resource">
                    <span><button>Add Item</button></span>
                </Link>
            )}
            
            <span><div><img src = 'ProfilePic3.png' /></div></span>
            
        </header>
    </div>
  )
}

export default Header