import Event from './components/eventsComponents/Event';
import { useContext } from 'react';
import { EventsContext } from './context/EventsContext';

function EventsList() {
  const { events } = useContext(EventsContext);
  return (
    <section>
      {events.map((event) => {
        return <Event key={event.id} event={event}></Event>;
      })}
    </section>
  );
}

export default EventsList;
