import React, {useEffect, useState} from 'react';

import { APP_ID, APP_KEY } from './constant/constant'
import Recipes from './components/Recipes'
import './App.css';
import loading from './loading.png';

const App = () =>  {

  /*
  * Define states
  */
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [isLoading, setIsLoading] = useState(false);

  /*
  * Fire api onload
  */
  useEffect(() => {
    getRecipes();
  }, [query]);


  /*
  * Get all recipes
  */
  const getRecipes = async () => {
    setIsLoading(true)
    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

    setIsLoading(false)
    const data = await res.json();
    setRecipes(data.hits)
  } 


  /*
  * Update search values
  */
  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  /*
  * Get searched values
  */
  const getSearch = (e) => { 
    e.preventDefault();
    setIsLoading(true);

    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
       <Recipes 
        search={search} 
        isLoading={isLoading} 
        searchRecipe={getSearch} 
        updateSearch={updateSearch} 
        recipes={recipes} 
      />
    </div>
  );
}

export default App;
