import React from 'react'
import { Link } from 'react-router-dom';

import "../styles/Navbar.css"

export default function Navbar() {
  return (
    <nav className='Navbar'>

      <h1 id="Navlogo">Logo</h1>
      <div id="NavList">
        <div>
            <Link to="/">Explore</Link>
        </div>
        <div>
            <Link to="/profile">Profile</Link>
        </div>

        <div>
            <Link to="/login">Login</Link>
        </div>

        <div>
          <Link to="/SignUp">SignUp</Link>
        </div>
      </div>

    </nav>
  )
}
