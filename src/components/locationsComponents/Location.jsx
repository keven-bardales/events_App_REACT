import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';

const Location = ({ location }) => {
  const navigate = useNavigate();
  const { deleteLocation } = useEvents();
  return (
    <div className='card'>
      <h3 className='cardtitle'>{location.name}</h3>
      <img className='card_image' src={location.picture} alt='Location' />
      <p className='description'>Address: {location.address}</p>
      <p className='description'>Municipality: {location.municipality}</p>
      <p className='description'>Department: {location.department}</p>
      <section className='card_group'>
        <div className='cardInfo'>
          <button onClick={() => deleteLocation(location.id)}>
            Delete Location
          </button>
        </div>
        <div className='cardInfo'>
          <button onClick={() => navigate(`/edit_location/${location.id}`)}>
            Edit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Location;
