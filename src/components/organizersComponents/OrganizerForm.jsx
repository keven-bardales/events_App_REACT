import { Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { useState, useEffect } from 'react';

const OrganizerForm = () => {
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
    <section className='form_section'>
      <h1>{params.id ? `Edit : ${organizer.name}` : 'Create an Organizer'}</h1>

      <Formik
        initialValues={organizer}
        enableReinitialize={true}
        // Resto del código...

        onSubmit={async (values) => {
          if (params.id) {
            await updateOrganizer(params.id, values);
            navigate('/organizers');
          } else {
            await createOrganizer(values);
            navigate('/organizers');
          }

          setorganizer({
            name: '',
            address: '',
            logo: '',
          });

          setformEnviado(true);
          setTimeout(() => setformEnviado(false), 3000);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className='createForm'>
            <section className='column c_1'>
              <div className='inputGroup'>
                <div className='formInput flex-100'>
                  <label htmlFor='name'>Organizer Name</label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Write an organizer name'
                    required
                  />
                </div>{' '}
                <div className='formInput flex-100'>
                  <label htmlFor='address'>Organizer Address</label>
                  <Field
                    type='text'
                    id='address'
                    name='address'
                    placeholder='Write an organizer address'
                    required
                  />
                </div>
                <div className='formInput flex-100'>
                  <label htmlFor='logo'>Organizer Logo</label>{' '}
                  <Field
                    type='text'
                    id='logo'
                    name='logo'
                    placeholder='Insert logo URL of organizer'
                    required
                  />
                </div>
              </div>{' '}
              <div className='inputGroup'>
                <div className='formInput'>
                  <img
                    src={
                      values.logo ? values.logo : 'https://placehold.co/600x400'
                    }
                  />
                </div>
              </div>
            </section>

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>

            <button
              className='form_cancel'
              onClick={() => navigate('/organizers')}
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

export default OrganizerForm;
