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
    <section className='form_section'>
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
          <Form className='createForm'>
            <section className='column c_1'>
              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='name'>Category Name</label>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Write a category name'
                    required
                  />
                </div>
              </div>

              <div className='inputGroup'>
                <div className='formInput'>
                  <label htmlFor='description'>Category Description</label>
                  <Field
                    type='text'
                    as='textarea'
                    id='description'
                    name='description'
                    placeholder='Write a category description'
                    required
                  />
                </div>
              </div>
            </section>

            <button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Saving...' : 'Send'}
            </button>

            <button
              className='form_cancel'
              onClick={() => navigate('/categories')}
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
};

export default CategoryForm;
