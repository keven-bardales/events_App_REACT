import { useEvents } from '../../context/EventsContext';
import { useEffect } from 'react';
import Category from './Category';

function CategoriesList() {
  const { categories, loadCategories } = useEvents();

  useEffect(() => {
    loadCategories();
  }, []);

  const renderCategoriesList = () => {
    if (categories.length == 0) {
      return <h1>No Categories In System</h1>;
    }

    return categories.map((category) => {
      return <Category key={category.id} category={category}></Category>;
    });
  };

  return <section className='List'>{renderCategoriesList()}</section>;
}

export default CategoriesList;
