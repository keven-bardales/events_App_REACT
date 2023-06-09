import { useContext, useState, useEffect } from 'react';

function OrganizersSelect(props) {
  const [organizers, setorganizers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/v1/organizers');
      const data = await response.json();
      setorganizers(data);
    }
    fetchData();
  }, []);
  return (
    <select
      required
      name='id_main_organizer'
      onChange={props.handleChange}
      defaultValue=''
    >
      <option value='' disabled>
        Select an organizer
      </option>
      {organizers.map((organizer) => {
        return (
          <option key={organizer.id} value={parseInt(organizer.id)}>
            {organizer.name}
          </option>
        );
      })}
    </select>
  );
}

export default OrganizersSelect;
