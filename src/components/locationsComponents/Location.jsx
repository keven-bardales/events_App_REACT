import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';

const Location = ({ location }) => {
  const navigate = useNavigate();
  const { deleteLocation } = useEvents();
  return (
    <article className='card'>
      <h3 className='cardtitle'>{location.name}</h3>
      <img className='card_image' src={location.picture} alt='Location' />

      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Address:</h4>
          <span className='content'>{location.address}</span>
        </div>
      </section>

      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Municipality:</h4>
          <span className='content'>{location.municipality}</span>
        </div>
        <div className='cardInfo'>
          <h4 className='item_title'>Department:</h4>
          <span className='content'>{location.department}</span>
        </div>
      </section>

      <section className='card_group button_group'>
        <button
          className='delete_button'
          onClick={() => deleteLocation(location.id)}
        >
          Delete
        </button>

        <button
          className='edit_button'
          onClick={() => navigate(`/edit_location/${location.id}`)}
        >
          Edit
        </button>
      </section>
    </article>
  );
};

export default Location;
