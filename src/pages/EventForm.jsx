import { Form, Formik, Field, ErrorMessage } from 'formik';
import LocationSelect from '../components/locationsComponents/LocationSelect';
import CategoriesSelect from '../components/categorieComponents/CategoriesSelect';
import OrganizersSelect from '../components/organizersComponents/OrganizersSelect';
import { useEffect, useState } from 'react';
import { useEvents } from '../context/EventsContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EventForm.css';

function EventForm() {
  const {
    createEvent,
    getEventById,
    categoryIdByName,
    organizerIdByName,
    locationIDByName,
    updateEvent,
  } = useEvents();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    cost: '',
    id_location: '',
    id_category: '',
    id_main_organizer: '',
    picture: '',
  });

  const [formEnviado, setformEnviado] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadEventById = async () => {
      if (params.id) {
        const editableEvent = await getEventById(params.id);
        const categoryId = await categoryIdByName(editableEvent.category_name);
        const organizerId = await organizerIdByName(
          editableEvent.organizer_name
        );
        const locationID = await locationIDByName(editableEvent.location_name);
        setEvent({
          name: editableEvent.event_name,
          description: editableEvent.event_description,
          start_time: convertMySQLDateTimeToHTML(editableEvent.start_time),
          end_time: convertMySQLDateTimeToHTML(editableEvent.end_time),
          cost: editableEvent.cost,
          id_location: locationID,
          id_category: categoryId,
          id_main_organizer: organizerId,
          picture: editableEvent.picture,
        });
      }
    };
    loadEventById();
  }, []);
  return (
    <div className='formDiv'>
      <h1>{params.id ? `Edit Event: ${params.id}` : 'Create a new Event'}</h1>
      <Formik
        initialValues={event}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          if (params.id) {
            await updateEvent(params.id, values);
            navigate('/events');
          } else {
            values.id_location = parseInt(values.id_location);
            values.id_category = parseInt(values.id_category);
            values.id_main_organizer = parseInt(values.id_main_organizer);

            await createEvent(values);

            navigate('/events');
          }

          setEvent({
            name: '',
            description: '',
            start_time: '',
            end_time: '',
            cost: '',
            id_location: '',
            id_category: '',
            id_main_organizer: '',
            picture: '',
          });
          setformEnviado(true);
          setTimeout(() => setformEnviado(false), 3000);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit} className='eventForm'>
            <label>Event Name</label>
            <Field
              type='text'
              name='name'
              placeholder='Write a name'
              required
            ></Field>

            <label>Event Picture</label>
            <img src={values.picture}></img>
            <Field
              type='text'
              name='picture'
              placeholder='Url of Event'
              required
            ></Field>

            <label>Description</label>
            <Field
              as='textarea'
              name='description'
              rows={3}
              placeholder='Write a description'
              required
            ></Field>

            <label>Start Time</label>
            <Field
              type='datetime-local'
              name='start_time'
              placeholder='Select start time'
              required
            />

            <label>End Time</label>
            <Field
              type='datetime-local'
              name='end_time'
              placeholder='Select end time'
              required
            />

            <label>Cost of Event</label>
            <Field
              type='number'
              name='cost'
              placeholder='Cost of the event'
              required
            ></Field>
            <CategoriesSelect></CategoriesSelect>
            <LocationSelect></LocationSelect>
            <OrganizersSelect></OrganizersSelect>
            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>
            {formEnviado && <p>Formulario enviado con exito!</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

function convertMySQLDateTimeToHTML(mysqlDateTime) {
  var dateTime = new Date(mysqlDateTime.replace('Z', ''));
  var year = dateTime.getUTCFullYear();
  var month = ('0' + (dateTime.getUTCMonth() + 1)).slice(-2);
  var day = ('0' + dateTime.getUTCDate()).slice(-2);
  var hours = ('0' + dateTime.getUTCHours()).slice(-2);
  var minutes = ('0' + dateTime.getUTCMinutes()).slice(-2);
  var datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;

  return datetimeLocal;
}

export default EventForm;
