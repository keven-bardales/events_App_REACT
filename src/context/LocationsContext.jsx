import { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export function LocationContextProvider(props) {
  const [locations, setlocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/v1/locations');
      const data = await response.json();
      setlocations(data);
    }
    fetchData();
  }, []);

  function getLocations() {
    return locations;
  }

  return (
    <LocationContext.Provider
      value={{
        locations,
        getLocations,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
}
