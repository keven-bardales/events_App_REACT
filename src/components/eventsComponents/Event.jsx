import React from 'react';
import moment from 'moment';
import '../../styles/Events.css';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';
import EventForm from '../../pages/EventForm';

function Event({ event }) {
  const { deleteEvent } = useEvents();
  const navigate = useNavigate();

  const eventDate = moment(event.start_time).format('YYYY-MM-DD');
  const startTime = moment(event.start_time).format('HH:mm');
  const endTime = moment(event.end_time).format('HH:mm');

  return (
    <div className='event-container'>
      <h2>{event.event_name}</h2>
      <img className='event-image' src={event.picture} alt='Event' />
      <p className='event-description'>{event.event_description}</p>
      <p className='event-cost'>Cost: {event.cost}</p>
      <div className='event-time'>
        <span className='event-date'>Date: {eventDate}</span>
        <span className='event-start-time'>
          Time:
          {startTime}-{endTime}
        </span>
      </div>
      <span className='event-location'>{event.location_name}</span>
      <span className='event-category'>{event.category_name}</span>
      <span className='event-organizer'>{event.organizer_name}</span>
      {<button onClick={() => deleteEvent(event.event_id)}>Delete</button>}
      <button onClick={() => navigate(`/edit_event/${event.event_id}`)}>
        Edit
      </button>
    </div>
  );
}

export default Event;
