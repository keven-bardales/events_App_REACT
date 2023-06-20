import { Form, Formik, Field, ErrorMessage } from 'formik';
import LocationSelect from '../locationsComponents/LocationSelect';
import CategoriesSelect from '../categorieComponents/CategoriesSelect';
import OrganizersSelect from '../organizersComponents/OrganizersSelect';
import { useEffect, useState } from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate, useParams } from 'react-router-dom';
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
    <section className='form_section'>
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
        {({ isSubmitting, values }) => (
          <Form className='createForm'>
            <section className='column c_1'>
              <div className='inputGroup'>
                <div className='formInput eventNameInput'>
                  <label htmlFor='name'>Event Name</label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Write a name'
                    required
                  />
                </div>

                <div className='formInput'>
                  <label htmlFor='picture'>Event Picture</label>

                  <Field
                    type='text'
                    id='picture'
                    name='picture'
                    placeholder='URL of Event Picture'
                    required
                  />
                </div>
              </div>

              <div className='inputGroup'>
                <div className='formInput imgContainer'>
                  <img
                    src={
                      values.picture
                        ? values.picture
                        : 'https://placehold.co/600x400'
                    }
                  />
                </div>
              </div>
            </section>

            <section className='column _c2'>
              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='cost'>Cost of Event</label>
                  <Field
                    type='number'
                    id='cost'
                    name='cost'
                    placeholder='Cost of the event'
                    required
                  />
                </div>{' '}
                <div className='formInput'>
                  <label htmlFor='start_time'>Start Time</label>
                  <Field
                    type='datetime-local'
                    id='start_time'
                    name='start_time'
                    placeholder='Select start time'
                    required
                  />
                </div>
                <div className='formInput'>
                  <label htmlFor='end_time'>End Time</label>
                  <Field
                    type='datetime-local'
                    id='end_time'
                    name='end_time'
                    placeholder='Select end time'
                    required
                  />
                </div>
              </div>

              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='description'>Description</label>
                  <Field
                    as='textarea'
                    id='description'
                    name='description'
                    rows={3}
                    placeholder='Write a description'
                    required
                  />
                </div>
              </div>

              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='categories'>Categories</label>
                  <CategoriesSelect id='categories' />
                </div>

                <div className='formInput'>
                  <label htmlFor='location'>Location</label>
                  <LocationSelect id='location' />
                </div>

                <div className='formInput'>
                  <label htmlFor='organizers'>Organizers</label>
                  <OrganizersSelect id='organizers' />
                </div>
              </div>
            </section>

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>

            <button
              className='form_cancel'
              onClick={() => navigate('/events')}
              disabled={isSubmitting}
              type='submit'
            >
              Cancel
            </button>

            {formEnviado && <p>Formulario enviado con éxito!</p>}
          </Form>
        )}
      </Formik>
    </section>
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
