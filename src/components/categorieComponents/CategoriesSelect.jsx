import { useContext, useState, useEffect } from 'react';

function CategoriesSelect(props) {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/v1/categories');
      const data = await response.json();
      setcategories(data);
    }
    fetchData();
  }, []);
  return (
    <select
      required
      name='id_category'
      onChange={props.handleChange}
      defaultValue=''
    >
      <option value='' disabled>
        Select a category
      </option>
      {categories.map((category) => {
        return (
          <option key={category.id} value={parseInt(category.id)}>
            {category.name}
          </option>
        );
      })}
    </select>
  );
}

export default CategoriesSelect;
