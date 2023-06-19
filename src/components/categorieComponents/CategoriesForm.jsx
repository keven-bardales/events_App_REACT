import { Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { useState, useEffect } from 'react';

const CategoryForm = () => {
  const { createCategory, getCategoryById, updateCategory } = useEvents();
  const [category, setcategory] = useState({
    name: '',
    description: '',
  });

  const [formEnviado, setformEnviado] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const categoryById = async () => {
      if (params.id) {
        const editableCategory = await getCategoryById(params.id);

        setorganizer({
          name: editableCategory.name,
          description: editableCategory.description,
        });
      }
    };

    categoryById();
  }, []);

  return (
    <div className='formDiv'>
      <h1>{params.id ? `Edit : ${category.name}` : 'Create a New Category'}</h1>

      <Formik
        initialValues={category}
        enableReinitialize={true}
        // Resto del código...

        onSubmit={async (values) => {
          if (params.id) {
            await updateCategory(params.id, values);
            navigate('/categories');
          } else {
            await createCategory(values);
            navigate('/categories');
          }

          setcategory({
            name: '',
            description: '',
          });

          setformEnviado(true);
          setTimeout(() => setformEnviado(false), 3000);
        }}
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

export default CategoryForm;
