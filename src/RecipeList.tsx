import React, { useState, useEffect, useCallback } from 'react';
import recipeService, { Recipe } from './recipeService';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Fetch recipes from service using useCallback so it can be passed as a prop
  const loadRecipes = useCallback(() => {
    setLoading(true);
    const allRecipes = recipeService.getAllRecipes();
    setRecipes(allRecipes);
    setLoading(false);
  }, []);

  // Load recipes on component mount
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      loadRecipes();
    } else {
      const results = recipeService.searchRecipes(term);
      setRecipes(results);
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim() === '') {
        loadRecipes();
      } else {
        const results = recipeService.searchRecipes(searchTerm);
        setRecipes(results);
      }
    }
  };

  // Handle recipe deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      recipeService.deleteRecipe(id);
      loadRecipes();
    }
  };

  // Handle opening the edit modal
  const handleEditClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    document.getElementById('edit_modal')?.showModal();
  };

  // Handle successful edit submission
  const handleEditSuccess = () => {
    document.getElementById('edit_modal')?.close();
    loadRecipes(); // Refresh the recipe list
    setSelectedRecipe(null); // Clear selected recipe
  };

  // Calculate how long ago the recipe was created
  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
    
    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Recipes</h2>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <div className="form-control w-full max-w-md">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
              <button 
                className="btn btn-square bg-red-500 hover:bg-red-600 border-none"
                onClick={() => {
                  if (searchTerm.trim() === '') {
                    loadRecipes();
                  } else {
                    const results = recipeService.searchRecipes(searchTerm);
                    setRecipes(results);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-red-500"></div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-2xl font-bold mb-2">No recipes found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Add a recipe to get started!'}
            </p>
            <button 
              className="btn bg-red-500 hover:bg-red-600 text-white mt-4"
              onClick={() => document.getElementById('my_modal_3')?.showModal()}
            >
              Add Your First Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <figure className="h-48">
                  {recipe.imageUrl ? (
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{recipe.title}</h3>
                  
                  {recipe.nutrients && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Nutrients:</span> {recipe.nutrients}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.cookingTime || 'Not specified'}
                  </div>
                  
                  <div className="card-actions justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(recipe.createdAt)}
                    </span>
                    
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => handleEditClick(recipe)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button 
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {recipes.length > 0 && (
          <div className="mt-8 text-center">
            <button 
              className="btn bg-red-500 hover:bg-red-600 text-white"
              onClick={() => document.getElementById('my_modal_3')?.showModal()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Recipe
            </button>
          </div>
        )}
      </div>

      {/* Edit Recipe Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {selectedRecipe && (
            <RecipeForm 
              mode="update"
              recipeId={selectedRecipe.id}
              initialData={{
                title: selectedRecipe.title,
                instructions: selectedRecipe.instructions,
                imageUrl: selectedRecipe.imageUrl,
                nutrients: selectedRecipe.nutrients,
                cookingTime: selectedRecipe.cookingTime
              }}
              onSuccess={handleEditSuccess}
            />
          )}
        </div>
      </dialog>
    </section>
  );
};

export default RecipeList;