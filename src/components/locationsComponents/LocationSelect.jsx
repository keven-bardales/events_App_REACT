import { useEffect } from 'react';
import { useEvents } from '../../context/EventsContext';
import { Field } from 'formik';

function LocationSelect(props) {
  const { locations, loadLocations } = useEvents();

  useEffect(() => {
    loadLocations();
  }, []);
  return (
    <Field required name='id_location' as='select'>
      <option value=''>Select a Location</option>
      {locations.map((location) => {
        return (
          <option key={location.id} value={parseInt(location.id)}>
            {location.name}
          </option>
        );
      })}
    </Field>
  );
}

export default LocationSelect;

/**  {locations.map((location) => {
          return (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          );
        })} */
