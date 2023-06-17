import React, { useState } from 'react';
import moment from 'moment';
import '../../styles/Events.css';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function User({ user }) {
  const { deleteUser } = useEvents();
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);

  return (
    <div key={user.id} className='event-container'>
      <h2>{user.name}</h2>
      <span>Avatar</span>
      <img className='event-image' src={user.avatar} alt='Event' />
      <p className='event-description'>{user.email}</p>
      <p className='event-cost'>Password: {showPass ? 'hola' : '*******'}</p>
      {<button onClick={() => deleteUser(user.id)}>Delete</button>}
      <button onClick={() => navigate(`/edit_user/${user.id}`)}>Edit</button>
    </div>
  );
}

export default User;
