import Organizer from './Organizer';
import { useEvents } from '../../context/EventsContext';
import { useEffect } from 'react';

function OrganizerList() {
  const { organizers, loadOrganizers } = useEvents();

  useEffect(() => {
    loadOrganizers();
  }, []);

  const renderOrganizerList = () => {
    if (organizers.length == 0) {
      return <h1>No Organizers In System</h1>;
    }

    return organizers.map((organizer) => {
      return <Organizer key={organizer.id} organizer={organizer}></Organizer>;
    });
  };

  return <section className='List'>{renderOrganizerList()}</section>;
}

export default OrganizerList;
