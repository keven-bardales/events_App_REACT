import React from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Category({ category }) {
  const { deleteCategory } = useEvents();
  const navigate = useNavigate();

  return (
    <div className='card'>
      <h2 className='cardtitle'>{category.name}</h2>
      <p className='description'>Description: {category.description}</p>
      <section className='card_group'>
        <div className='cardInfo'>
          <button onClick={() => deleteCategory(category.id)}>Delete</button>
        </div>
        <div className='cardInfo'>
          <button onClick={() => navigate(`/edit_category/${category.id}`)}>
            Edit
          </button>
        </div>
      </section>
    </div>
  );
}

export default Category;
