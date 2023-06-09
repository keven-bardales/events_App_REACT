import EventsList from '../EventsList';
import { EventsContextProvider } from '../context/EventsContext';
export function EventPage() {
  return (
    <>
      <EventsContextProvider>
        <EventsList></EventsList>
      </EventsContextProvider>
    </>
  );
}

export default EventPage;
