import React from 'react';

function Event({ event }) {
  return (
    <div>
      <h2>{event.event_name}</h2>
      <p>{event.description}</p>
      <div>
        <span>{event.start_time}</span>
        <span>{event.end_time}</span>
      </div>
      <span>{event.location_name}</span>
      <span>{event.category_name}</span>
      <span>{event.main_organizer_name}</span>
    </div>
  );
}

export default Event;
