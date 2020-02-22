import React from 'react'
import '../App.css';
import Recipe from './Recipe'

const Recipes = (props) => {
	const { search, isLoading, searchRecipe, updateSearch, recipes} = props;
	return (
		<div>

	      <form onSubmit={searchRecipe} className="search-form">
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

	)
}


export default Recipes;