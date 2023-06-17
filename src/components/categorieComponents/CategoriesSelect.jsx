import { Field } from 'formik';
import { useEffect } from 'react';
import { useEvents } from '../../context/EventsContext';

function CategoriesSelect(props) {
  const { categories, loadCategories } = useEvents();

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Field required name='id_category' as='select'>
      <option value=''>Select a category</option>
      {categories.map((category) => {
        return (
          <option key={category.id} value={parseInt(category.id)}>
            {category.name}
          </option>
        );
      })}
    </Field>
  );
}

export default CategoriesSelect;
