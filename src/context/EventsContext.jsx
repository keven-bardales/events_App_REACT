import { createContext, useState, useEffect } from 'react';

export const EventsContext = createContext();

export function EventsContextProvider(props) {
  const [events, setevents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/v1/events');
      const data = await response.json();
      setevents(data);
    }
    fetchData();
  }, []);

  function getEvents() {
    return events;
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        getEvents,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
}
