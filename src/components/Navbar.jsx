import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className='Navbar'>
      <ul className='navBarMenu'>
        <li className='navbar_link active'>
          <Link to='/'>Home</Link>
        </li>
        <li className='navbar_link'>
          <Link to='/events'>Events</Link>
          <ul>
            <li className='navbar_link'>
              <Link to='/new_event'>Create Event</Link>
            </li>
          </ul>
        </li>
        <li className='navbar_link'>
          <Link to='/locations'>Locations</Link>
          <ul>
            <li className='navbar_link'>
              <Link to='/new_location'>Create Location</Link>
            </li>
          </ul>
        </li>
        <li className='navbar_link'>
          <Link to='/organizers'>Organizers</Link>
          <ul>
            <li className='navbar_link'>
              <Link to='/new_organizer'>Create Organizer</Link>
            </li>
          </ul>
        </li>
        <li className='navbar_link'>
          <Link to='/users'>Users</Link>
          <ul>
            <li className='navbar_link'>
              <Link to='/new_user'>Create User</Link>
            </li>
          </ul>
        </li>
        <li className='navbar_link'>
          <Link to='/categories'>Categories</Link>
          <ul>
            <li className='navbar_link'>
              <Link to='/new_category'>Create Category</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
