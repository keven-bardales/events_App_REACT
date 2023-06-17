import { Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { useState, useEffect } from 'react';

const LocationForm = () => {
  const { createOrganizer, getOrganizerById, updateOrganizer } = useEvents();
  const [organizer, setorganizer] = useState({
    name: '',
    address: '',
    logo: '',
  });

  const [formEnviado, setformEnviado] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const organizerById = async () => {
      if (params.id) {
        const editableOrganizer = await getOrganizerById(params.id);

        setorganizer({
          name: editableOrganizer.name,
          address: editableOrganizer.address,
          logo: editableOrganizer.logo,
        });
      }
    };

    organizerById();
  }, []);

  return (
    <div className='formDiv'>
      <h1>{params.id ? `Edit : ${organizer.name}` : 'Create an Organizer'}</h1>

      <Formik
        initialValues={organizer}
        enableReinitialize={true}
        // Resto del código...

        onSubmit={async (values) => {
          const { confirmPassword, ...newUser } = values;

          if (params.id) {
            await updateUser(params.id, newUser);
            navigate('/users');
          } else {
            await createUser(newUser);
            navigate('/users');
          }

          setUser({
            name: '',
            email: '',
            password: '',
            avatar: '',
            confirmPassword: '',
          });

          setformEnviado(true);
          setTimeout(() => setformEnviado(false), 3000);
        }}

        // Resto del código...
      >
        {({ isSubmitting, values }) => (
          <Form>
            <label>Organizer Name</label>
            <Field
              type='text'
              name='name'
              placeholder='Write a location Name'
              required
            ></Field>{' '}
            <label>Organizer Logo</label>
            <img src={values.logo}></img>
            <Field
              type='text'
              name='logo'
              placeholder='Insert Logo of Organizer'
              required
            ></Field>{' '}
            <label>Organizer Address</label>
            <Field
              type='text'
              name='address'
              placeholder='Write a Street Name'
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
