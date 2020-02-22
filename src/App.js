import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';
import loading from './loading.png';

const App = () =>  {
  const APP_ID = "4e32c3fe"
  const APP_KEY = "88f56d507ec635e8c0741cfc52fbc635"

  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    getRecipes();
   
  }, [query]);


  const getRecipes = async () => {
    setIsLoading(true)
    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

    setIsLoading(false)
    const data = await res.json();
    setRecipes(data.hits)
    console.log(data.hits);
  }


  const updateSearch = (e) => {
    setSearch(e.target.value)
  }


  const getSearch = (e) => {
    setIsLoading(true)
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <div className="form-group " style={{display:"-webkit-box"}}>
          <input type="text" className="form-control search-bar" value={search} onChange={updateSearch} placeholder="Search new recipes here"/>
          <button className="search-button btn btn-primary" type="submit">SEARCH</button>
        </div>
      </form>
      <div className="recipes">
      {isLoading ? (<div className="text-center" style={{marginRight:'50px'}}><h2>Loading...</h2></div>) : null}
        {recipes.map((recipe) =>(
              <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label}  
                calories={recipe.recipe.calories}  
                image={recipe.recipe.image} 
                ingredients={recipe.recipe.ingredients}
                />
            ))
        }
      </div>

    </div>
  );
}

export default App;
