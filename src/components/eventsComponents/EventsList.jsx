import Event from './Event';
import { useEvents } from '../../context/EventsContext';
import { useEffect } from 'react';

function EventsList() {
  const { events, loadEvents } = useEvents();

  useEffect(() => {
    loadEvents();
  }, []);

  const renderEventList = () => {
    if (events.length == 0) {
      return <h1>No Events In System</h1>;
    }

    return events.map((event) => {
      return <Event key={event.event_id} event={event}></Event>;
    });
  };

  return (
    <section className='List'>
      <h2 className='list_title'>Events</h2>
      {renderEventList()}
    </section>
  );
}

export default EventsList;
