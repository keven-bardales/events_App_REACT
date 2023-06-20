import React from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Organizer({ organizer }) {
  const { deleteOrganizer } = useEvents();
  const navigate = useNavigate();

  return (
    <article className='card'>
      <h3 className='cardtitle'>{organizer.name}</h3>
      <img className='card_image' src={organizer.logo} alt='Organizer' />
      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Address:</h4>
          <span className='content'>{organizer.address}</span>
        </div>
      </section>

      <section className='card_group button_group'>
        <button
          className='delete_button'
          onClick={() => deleteOrganizer(organizer.id)}
        >
          Delete
        </button>

        <button
          className='edit_button'
          onClick={() => navigate(`/edit_organizer/${organizer.id}`)}
        >
          Edit
        </button>
      </section>
    </article>
  );
}

export default Organizer;
