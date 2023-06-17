import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>React My SQL</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/events'>Events</Link>
          <ul>
            <li>
              <Link to='/new_event'>Create Event</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to='/locations'>Locations</Link>
          <ul>
            <li>
              <Link to='/new_location'>Create Location</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to='/organizers'>Organizers</Link>
          <ul>
            <li>
              <Link to='/new_organizer'>Create Organizer</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to='/users'>Users</Link>
          <ul>
            <li>
              <Link to='/new_user'>Create User</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
