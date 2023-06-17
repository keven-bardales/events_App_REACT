import { Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { useState, useEffect } from 'react';

const LocationForm = () => {
  const { createLocation, getLocationById, updateLocation } = useEvents();
  const [location, setlocation] = useState({
    name: '',
    address: '',
    municipality: '',
    department: '',
    picture: '',
  });

  const [formEnviado, setformEnviado] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadLocationById = async () => {
      if (params.id) {
        const editableLocation = await getLocationById(params.id);

        setlocation({
          name: editableLocation.name,
          address: editableLocation.address,
          municipality: editableLocation.municipality,
          department: editableLocation.department,
          picture: editableLocation.picture,
        });
      }
    };

    loadLocationById();
  }, []);

  return (
    <div className='formDiv'>
      <h1>{params.id ? `Edit Location: ${params.id}` : 'Create a Location'}</h1>

      <Formik
        initialValues={location}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (params.id) {
            await updateLocation(params.id, values);
            navigate(`/locations`);
          } else {
            await createLocation(values);
            navigate(`/locations`);
          }

          setlocation({
            name: '',
            address: '',
            municipality: '',
            department: '',
            picture: '',
          });
          setformEnviado(true);
          setTimeout(() => setformEnviado(false));
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <label>Location Name</label>
            <Field
              type='text'
              name='name'
              placeholder='Write a location Name'
              required
            ></Field>{' '}
            <label>Location Picture</label>
            <img src={values.picture}></img>
            <Field
              type='text'
              name='picture'
              placeholder='Insert Image of Location'
              required
            ></Field>{' '}
            <label>Street Adress</label>
            <Field
              type='text'
              name='address'
              placeholder='Write a Street Name'
              required
            ></Field>
            <label>Municipality</label>
            <Field
              type='text'
              name='municipality'
              placeholder='Write the Municipality Name'
              required
            ></Field>
            <label>department</label>
            <Field
              type='text'
              name='department'
              placeholder='Write the department Name'
              required
            ></Field>
            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>
            {formEnviado && <p>Formulario enviado con exito!</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LocationForm;
