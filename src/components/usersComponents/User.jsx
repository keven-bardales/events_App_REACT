import React, { useState } from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function User({ user }) {
  const { deleteUser } = useEvents();
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);

  return (
    <div key={user.id} className='card'>
      <h2 className='cardtitle'>{user.name}</h2>
      <span>Avatar</span>
      <img className='card_image' src={user.avatar} alt='Event' />
      <p className='description'>{user.email}</p>
      <p className='description'>Password: {showPass ? 'hola' : '*******'}</p>
      <section className='card_group'>
        <div className='cardInfo'>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
        <div className='cardInfo'>
          <button onClick={() => navigate(`/edit_user/${user.id}`)}>
            Edit
          </button>
        </div>
      </section>
    </div>
  );
}

export default User;
