import Event from './components/eventsComponents/Event';
import { useEvents } from './context/EventsContext';
import { useEffect } from 'react';
import './styles/EventList.css';

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

  return <section className='EventList'>{renderEventList()}</section>;
}

export default EventsList;
