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
    <section className='form_section'>
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
          <Form className='createForm locationForm'>
            <section className='column c_1'>
              {' '}
              <div className='inputGroup'>
                <div className='formInput flex-100'>
                  <label htmlFor='name'>Location Name</label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Write a location name'
                    required
                  />
                </div>
                <div className='formInput flex-100'>
                  <label htmlFor='picture'>Location Picture</label>

                  <Field
                    type='text'
                    id='picture'
                    name='picture'
                    placeholder='Insert image URL of location'
                    required
                  />
                </div>
              </div>{' '}
              <div className='inputGroup'>
                <div className='formInput'>
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
              {' '}
              <div className='formInput'>
                <label htmlFor='municipality'>Municipality</label>
                <Field
                  type='text'
                  id='municipality'
                  name='municipality'
                  placeholder='Write the municipality name'
                  required
                />
              </div>
              <div className='formInput'>
                <label htmlFor='department'>Department</label>
                <Field
                  type='text'
                  id='department'
                  name='department'
                  placeholder='Write the department name'
                  required
                />
              </div>{' '}
              <div className='formInput'>
                <label htmlFor='address'>Street Address</label>
                <Field
                  type='text'
                  id='address'
                  name='address'
                  placeholder='Write a street name'
                  required
                />
              </div>
            </section>

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>

            <button
              className='form_cancel'
              onClick={() => navigate('/locations')}
              disabled={isSubmitting}
              type='submit'
            >
              Cancel
            </button>

            {formEnviado && <p>Form sent successfully!</p>}
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LocationForm;
