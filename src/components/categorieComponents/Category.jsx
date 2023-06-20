import React from 'react';
import { useEvents } from '../../context/EventsContext';
import { useNavigate } from 'react-router-dom';

function Category({ category }) {
  const { deleteCategory } = useEvents();
  const navigate = useNavigate();

  return (
    <article className='card'>
      <h3 className='cardtitle'>{category.name}</h3>

      <section className='card_group'>
        <div className='cardInfo'>
          <h4 className='item_title'>Description:</h4>
          <span className='content'>{category.description}</span>
        </div>
      </section>

      <section className='card_group button_group'>
        <button
          className='delete_button'
          onClick={() => deleteCategory(category.id)}
        >
          Delete
        </button>

        <button
          className='edit_button'
          onClick={() => navigate(`/edit_category/${category.id}`)}
        >
          Edit
        </button>
      </section>
    </article>
  );
}

export default Category;
