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
      }
    };
    loadUserById();
  }, []);
  return (
    <div className='formDiv'>
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
          <Form className='eventForm'>
            <label>Full Name {!params.id && <span>*</span>}</label>
            <Field
              type='text'
              name='name'
              placeholder='Write a name'
              required
            ></Field>

            <label>User Avatar {!params.id && <span>*</span>}</label>
            <img src={values.avatar}></img>
            <Field
              type='text'
              name='avatar'
              placeholder='Url of Avatar Picture'
              required
            ></Field>

            <label>Email {!params.id && <span>*</span>}</label>
            <Field
              type='email'
              name='email'
              placeholder='Enter an email'
              required
            ></Field>

            <label>Password {!params.id && <span>*</span>}</label>
            <Field
              type='password'
              name='password'
              placeholder='Enter a password'
              required={!params.id}
            />

            <label>Confirm Password {!params.id && <span>*</span>}</label>
            <Field
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              required={!params.id}
            />

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>
            {formEnviado && <p>Form sent Succesfully</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
