// Recipe service for managing CRUD operations using localStorage

// Define the Recipe interface
export interface Recipe {
  id: string;
  title: string;
  instructions: string;
  imageUrl: string;
  nutrients: string;
  cookingTime: string;
  createdAt: number;
  updatedAt: number;
}

// Storage key for recipes in localStorage
const STORAGE_KEY = 'recipehub_recipes';

/**
 * Get all recipes from localStorage
 * @returns Array of recipes
 */
export const getAllRecipes = (): Recipe[] => {
  try {
    const recipes = localStorage.getItem(STORAGE_KEY);
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    return [];
  }
};

/**
 * Get a single recipe by ID
 * @param id Recipe ID
 * @returns Recipe object or null if not found
 */
export const getRecipeById = (id: string): Recipe | null => {
  try {
    const recipes = getAllRecipes();
    return recipes.find(recipe => recipe.id === id) || null;
  } catch (error) {
    console.error(`Error retrieving recipe with ID ${id}:`, error);
    return null;
  }
};

/**
 * Create a new recipe
 * @param recipeData Recipe data without ID
 * @returns Created recipe with ID and timestamps
 */
export const createRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Recipe => {
  try {
    const recipes = getAllRecipes();
    
    // Create new recipe with ID and timestamps
    const newRecipe: Recipe = {
      ...recipeData,
      id: crypto.randomUUID(), // Generate unique ID
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    // Add to recipes array
    recipes.push(newRecipe);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    
    return newRecipe;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw new Error('Failed to create recipe');
  }
};

/**
 * Update an existing recipe
 * @param id Recipe ID
 * @param recipeData Updated recipe data
 * @returns Updated recipe or null if not found
 */
export const updateRecipe = (id: string, recipeData: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>): Recipe | null => {
  try {
    const recipes = getAllRecipes();
    const index = recipes.findIndex(recipe => recipe.id === id);
    
    if (index === -1) {
      return null; // Recipe not found
    }
    
    // Update recipe with new data and update timestamp
    const updatedRecipe: Recipe = {
      ...recipes[index],
      ...recipeData,
      updatedAt: Date.now()
    };
    
    recipes[index] = updatedRecipe;
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    
    return updatedRecipe;
  } catch (error) {
    console.error(`Error updating recipe with ID ${id}:`, error);
    throw new Error(`Failed to update recipe ${id}`);
  }
};

/**
 * Delete a recipe by ID
 * @param id Recipe ID
 * @returns true if deleted, false if not found
 */
export const deleteRecipe = (id: string): boolean => {
  try {
    const recipes = getAllRecipes();
    const initialLength = recipes.length;
    
    const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
    
    if (filteredRecipes.length === initialLength) {
      return false; // Recipe not found
    }
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes));
    
    return true;
  } catch (error) {
    console.error(`Error deleting recipe with ID ${id}:`, error);
    throw new Error(`Failed to delete recipe ${id}`);
  }
};

/**
 * Search recipes by title
 * @param query Search query
 * @returns Array of matching recipes
 */
export const searchRecipes = (query: string): Recipe[] => {
  try {
    const recipes = getAllRecipes();
    if (!query.trim()) return recipes;
    
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

// Export default object with all functions
const recipeService = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes
};

export default recipeService;