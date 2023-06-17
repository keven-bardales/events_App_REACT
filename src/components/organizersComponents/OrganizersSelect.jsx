import { useContext, useState, useEffect } from 'react';
import { Field } from 'formik';
import { useEvents } from '../../context/EventsContext';

function OrganizersSelect(props) {
  const { organizers, loadOrganizers } = useEvents();

  useEffect(() => {
    loadOrganizers();
  }, []);
  return (
    <Field required name='id_main_organizer' as='select'>
      <option value=''>Select an Organizer</option>
      {organizers.map((organizer) => {
        return (
          <option key={organizer.id} value={parseInt(organizer.id)}>
            {organizer.name}
          </option>
        );
      })}
    </Field>
  );
}

export default OrganizersSelect;
