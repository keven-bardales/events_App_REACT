import React, { useState } from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function User({ user }) {
  const { deleteUser } = useEvents();
  const navigate = useNavigate();

  return (
    <article key={user.id} className='card'>
      <h3 className='cardtitle'>{user.name}</h3>
      <img className='card_image' src={user.avatar} alt='Event' />

      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Email:</h4>
          <span className='content'>{user.email}</span>
        </div>
        <div className='cardInfo'>
          <h4 className='item_title'>Password:</h4>
          <span className='content'>*******</span>
        </div>
      </section>

      <section className='card_group button_group'>
        <button className='delete_button' onClick={() => deleteUser(user.id)}>
          Delete
        </button>

        <button
          className='edit_button'
          onClick={() => navigate(`/edit_user/${user.id}`)}
        >
          Edit
        </button>
      </section>
    </article>
  );
}

export default User;
