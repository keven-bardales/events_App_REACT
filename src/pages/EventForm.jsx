import { Form, Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import LocationSelect from '../components/locationsComponents/LocationSelect';
import CategoriesSelect from '../components/categorieComponents/CategoriesSelect';
import OrganizersSelect from '../components/organizersComponents/OrganizersSelect';

function EventForm() {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          description: '',
          start_time: '',
          end_time: '',
          cost: 0,
          id_location: 0,
          id_category: 0,
          id_main_organizer: 0,
        }}
        onSubmit={async (values) => {
          values.id_location = parseInt(values.id_location);
          values.id_category = parseInt(values.id_category);
          values.id_main_organizer = parseInt(values.id_main_organizer);
          values.start_time = formatDateForDatabase(values.start_time);
          values.end_time = formatDateForDatabase(values.end_time);
          console.log(values);
          try {
            const response = await createEventRequest(values);
            console.log(response);
          } catch (error) {
            console.log(error.response.data);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Create an Event</h1>
            <label>Event Name</label>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              placeholder='Write a name'
              required
            ></input>

            <label>Description</label>
            <textarea
              onChange={handleChange}
              name='description'
              rows={3}
              placeholder='Write a description'
              required
            ></textarea>

            <label>Start Time</label>
            <input
              onChange={handleChange}
              type='datetime-local'
              name='start_time'
              placeholder='Select start time'
              required
            />

            <label>End Time</label>
            <input
              onChange={handleChange}
              type='datetime-local'
              name='end_time'
              placeholder='Select end time'
              required
            />

            <label>Cost of Event</label>
            <input
              onChange={handleChange}
              type='number'
              name='cost'
              placeholder='Cost of the event'
              required
            ></input>
            <LocationSelect handleChange={handleChange}></LocationSelect>
            <CategoriesSelect handleChange={handleChange}></CategoriesSelect>
            <OrganizersSelect handleChange={handleChange}></OrganizersSelect>
            <button type='submit'>send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
function formatDateForDatabase(dateTimeString) {
  const date = new Date(dateTimeString);
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

  return formattedDate;
}

export default EventForm;
