import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else break;
  }

  return (
    <div className="single-meal">
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>{meal.strCategory} | {meal.strArea}</p>

      <h2>Ingredientes</h2>
      <ul>
        {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h2>Instrucciones</h2>
      <p>{meal.strInstructions}</p>
    </div>
  );
}

export default Meal;