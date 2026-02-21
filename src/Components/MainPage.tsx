import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarWithIcon from './Searchbar';
import ComponentImage from './imagen';

interface MealType {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function MainPage(){
    const [searchWord, setSearchWord] = useState('');
    const [meals, setMeals] = useState<MealType[]>([]);
    const [resultHeading, setResultHeading] = useState('');
    const navigate = useNavigate();
    const [hasSearched, setHasSearched] = useState(false);

    const searchMeal = async ()=>{
        if(!searchWord.trim()) return console.error('There is nothing to search for.');

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`);
        const data = await response.json();

        setMeals(data.meals || []);
        setResultHeading(data.meals ? `${searchWord} results:`: `Error 404`);
        setHasSearched(true);
        setSearchWord('');
    };

    const searchRandomMeal = async ()=>{
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        setMeals([meal]);
        setResultHeading('Random Meal:');
        setHasSearched(true);
    };

    return (
        <div className='container'>
            <h1>BUSCADOR GENERAL</h1>
            <div className='search-container'>
                <SearchBarWithIcon searchWord={searchWord} setSearchWord={setSearchWord}/>
                <button onClick={searchMeal} className='search-button'><span className="material-symbols-outlined">
                    search  
                </span></button>
                <button onClick={searchRandomMeal} className='search-random-button'>Shuffle</button>
            </div>
            {!hasSearched && <ComponentImage />}
            <h1>{resultHeading}</h1>
            
            <div className='mealsresults'>
                {meals.map(meal =>(
                    <div key={meal.idMeal} className='mealresult' onClick={() => navigate(`/meal/${meal.idMeal}`)} style={{cursor:`pointer`}}>
                        <img src = {meal.strMealThumb} alt={meal.strMeal} />
                        <div className='meal-detail'>
                            <h4>{meal.strMeal}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage;