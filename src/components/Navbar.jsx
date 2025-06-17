import React from 'react'
import { Link } from 'react-router-dom';

import "../styles/Navbar.css"

export default function Navbar( { UserData, setUserData } ) {

  async function handleLogout(){

    localStorage.setItem("User",null);
    setUserData(null)
  }

  return (
    <nav className='Navbar'>

      <h1 id="Navlogo">Logo</h1>
      <div id="NavList">
        <div>
            <Link to="/">Explore</Link>
        </div>
        <div>
            <Link to="/profile">Profile </Link>
        </div>

        {
        !UserData &&  <div>
          <Link to="/login">Login</Link>
            
          <Link to="/SignUp">SignUp</Link>
        </div>
        }
        {
          UserData && 
         <div>
            <Link  to="/login" onClick={handleLogout}>Logout</Link>
        </div>
        }
  

      </div>

    </nav>
  )
}