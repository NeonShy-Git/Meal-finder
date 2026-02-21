import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface MealDetail {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
}

function Meal() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setMeal(data.meals[0]);
    };
    fetchMeal();
  }, [id]);

  if (!meal) return <p>Cargando...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const quantity = meal[`strMeasure${i}`];
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${ingredient} - ${quantity}`);
    }
  }

  return (
    <div className="meal-details-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>
         Back home
      </button>

      <div className="meal-details-container">
        <header className='meal-header'>
          <h1>{meal.strMeal}</h1>
            <span className="meal-category">{meal.strCategory}</span>
            <span className="meal-area">{meal.strArea}</span>
        </header>
        <div className="meal-image-container">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="meal-instructions">
          <section>
            <h2>Ingredientes</h2>
              <ul className='meal-ingredients'>
                {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
          </section>
        </div>
      </div>

      <section className='meal-section'>
        <h2>Instrucciones</h2>
        <p>{meal.strInstructions}</p>
      </section>
    </div>
  );
}

export default Meal;