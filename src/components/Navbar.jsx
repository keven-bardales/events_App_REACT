import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <h1>React My SQL</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/events'>Create Event</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
