import React from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Organizer({ organizer }) {
  const { deleteOrganizer } = useEvents();
  const navigate = useNavigate();

  return (
    <div className='card'>
      <h2 className='cardtitle'>{organizer.name}</h2>
      <span>Logo</span>
      <img className='card_image' src={organizer.logo} alt='Organizer' />
      <p className='description'>Address: {organizer.address}</p>
      <section className='card_group'>
        <div className='cardInfo'>
          <button onClick={() => deleteOrganizer(organizer.id)}>Delete</button>
        </div>
        <div className='cardInfo'>
          <button onClick={() => navigate(`/edit_organizer/${organizer.id}`)}>
            Edit
          </button>
        </div>
      </section>
    </div>
  );
}

export default Organizer;
