import React from 'react';
import '../../styles/Events.css';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Organizer({ organizer }) {
  const { deleteOrganizer } = useEvents();
  const navigate = useNavigate();

  return (
    <div className='organizer-container'>
      <h2>{organizer.name}</h2>
      <span>Logo</span>
      <img className='event-image' src={organizer.logo} />
      <p className='event-description'>Address: {organizer.address}</p>
      {<button onClick={() => deleteOrganizer(organizer.id)}>Delete</button>}
      <button onClick={() => navigate(`/edit_organizer/${organizer.id}`)}>
        Edit
      </button>
    </div>
  );
}

export default Organizer;
