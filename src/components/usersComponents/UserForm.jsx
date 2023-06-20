import { Form, Formik, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate, useParams } from 'react-router-dom';
function UserForm() {
  const { createUser, updateUser, getUserById } = useEvents();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    confirmPassword: '',
  });

  const [formEnviado, setformEnviado] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserById = async () => {
      if (params.id) {
        const editableUser = await getUserById(params.id);
        setUser({
          name: editableUser.name,
          email: editableUser.email,
          password: '',
          avatar: editableUser.avatar,
          confirmPassword: '',
        });
      } else {
        setUser({
          name: '',
          email: '',
          password: '',
          avatar: '',
          confirmPassword: '',
        });
      }
    };
    loadUserById();
  }, [params.id]);

  return (
    <section className='form_section'>
      <h1>{params.id ? `Edit User: ${user.name}` : 'Create a new User'}</h1>
      <Formik
        initialValues={user}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const newUser = { ...values };
          delete newUser.confirmPassword;
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
      >
        {({ isSubmitting, values }) => (
          <Form className='createForm'>
            <section className='column c_1'>
              <div className='inputGroup flex-100'>
                <div className='formInput'>
                  <label htmlFor='name'>
                    Full Name {!params.id && <span>*</span>}
                  </label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Write a name'
                    required
                  />
                </div>

                <div className='formInput flex-100'>
                  <label htmlFor='avatar'>
                    User Avatar {!params.id && <span>*</span>}
                  </label>
                  <Field
                    type='text'
                    id='avatar'
                    name='avatar'
                    placeholder='URL of Avatar Picture'
                    required
                  />
                </div>
              </div>
              <div className='inputGroup'>
                <div className='formInput'>
                  <img
                    src={
                      values.avatar
                        ? values.avatar
                        : 'https://placehold.co/600x400'
                    }
                  />
                </div>
              </div>
            </section>

            <section className='column _c2'>
              {' '}
              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='email'>
                    Email {!params.id && <span>*</span>}
                  </label>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter an email'
                    required
                  />
                </div>

                <div className='formInput'>
                  <label htmlFor='password'>
                    Password {!params.id && <span>*</span>}
                  </label>
                  <Field
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter a password'
                    required={!params.id}
                  />
                </div>

                <div className='formInput'>
                  <label htmlFor='confirmPassword'>
                    Confirm Password {!params.id && <span>*</span>}
                  </label>
                  <Field
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    required={!params.id}
                  />
                </div>
              </div>
            </section>

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>

            <button
              className='form_cancel'
              onClick={() => navigate('/users')}
              disabled={isSubmitting}
              type='submit'
            >
              Cancel
            </button>

            {formEnviado && <p>Form sent successfully</p>}
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default UserForm;
