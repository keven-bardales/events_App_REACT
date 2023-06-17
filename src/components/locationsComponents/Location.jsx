import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';

const Location = ({ location }) => {
  const navigate = useNavigate();
  const { deleteLocation } = useEvents();
  return (
    <div>
      <h2>{location.name}</h2>
      <img src={location.picture}></img>
      <p>Adress: {location.address}</p>
      <p>Municipality:{location.municipality}</p>
      <p>Department: {location.department}</p>
      <button onClick={() => deleteLocation(location.id)}>
        Delete Location
      </button>
      <button onClick={() => navigate(`/edit_location/${location.id}`)}>
        Edit
      </button>
    </div>
  );
};

export default Location;
