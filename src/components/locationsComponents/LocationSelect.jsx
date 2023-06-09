import { useContext, useState, useEffect } from 'react';
import {
  LocationContext,
  LocationContextProvider,
} from '../../context/LocationsContext';
import { Field } from 'formik';

function LocationSelect(props) {
  const [locations, setlocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/v1/locations');
      const data = await response.json();
      setlocations(data);
    }
    fetchData();
  }, []);
  return (
    <select
      required
      name='id_location'
      onChange={props.handleChange}
      defaultValue=''
    >
      <option value='' disabled>
        Select a Location
      </option>
      {locations.map((location) => {
        return (
          <option key={location.id} value={parseInt(location.id)}>
            {location.name}
          </option>
        );
      })}
    </select>
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
