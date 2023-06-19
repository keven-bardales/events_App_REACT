import React from 'react';
import moment from 'moment';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Event({ event }) {
  const { deleteEvent } = useEvents();
  const navigate = useNavigate();

  const eventDate = moment(event.start_time).format('YYYY-MM-DD');
  const startTime = moment(event.start_time).format('HH:mm');
  const endTime = moment(event.end_time).format('HH:mm');

  return (
    <article className='card'>
      <h3 className='cardtitle'>{event.event_name}</h3>
      <img className='card_image' src={event.picture} alt='Event' />
      <p className='description'>{event.event_description}</p>
      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Cost:</h4>
          <span className='content'> {event.cost}</span>
        </div>

        <div className='cardInfo'>
          <h4 className='item_title'>Location: </h4>
          <span className='content'>{event.location_name}</span>
        </div>
      </section>
      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Date:</h4>
          <span>{eventDate}</span>
        </div>
        <div className='cardInfo'>
          <h4 className='item_title'>Time:</h4>
          <span className='content'>
            {startTime}-{endTime}
          </span>
        </div>
      </section>
      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Category:</h4>
          <span className='content'>{event.category_name}</span>
        </div>
        <div className='cardInfo'>
          <h4 className='item_title'>Organizer:</h4>
          <span className='content'>{event.organizer_name}</span>
        </div>
      </section>
      {<button onClick={() => deleteEvent(event.event_id)}>Delete</button>}
      <button onClick={() => navigate(`/edit_event/${event.event_id}`)}>
        Edit
      </button>
    </article>
  );
}

export default Event;
