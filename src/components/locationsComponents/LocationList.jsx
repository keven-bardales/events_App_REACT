import { useEvents } from '../../context/EventsContext';
import { useEffect } from 'react';
import Location from './Location';

const LocationList = () => {
  const { locations, loadLocations } = useEvents();

  useEffect(() => {
    loadLocations();
  }, []);

  const renderLocationList = () => {
    if (locations.length == 0) {
      return <h1>No Locations In System</h1>;
    }

    return locations.map((location) => {
      return <Location key={location.id} location={location}></Location>;
    });
  };

  return (
    <section className='List'>
      <h2 className='list_title'>Locations</h2>
      {renderLocationList()}
    </section>
  );
};

export default LocationList;
