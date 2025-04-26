import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import recipeService from './recipeService'

// Define the type for recipe data
interface RecipeFormData {
  title: string;
  instructions: string;
  imageUrl: string;
  nutrients: string;
  cookingTime: string;
}

// Props for the RecipeForm component
interface RecipeFormProps {
  initialData?: Partial<RecipeFormData>;
  onSubmit?: (data: RecipeFormData) => void;
  recipeId?: string;
  mode?: 'add' | 'update';
  onSuccess?: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ 
  initialData = {}, 
  onSubmit, 
  recipeId, 
  mode = 'add',
  onSuccess
}) => {
    // Initialize state with either provided data or empty values
    const [formData, setFormData] = useState<RecipeFormData>({
        title: initialData.title || '',
        instructions: initialData.instructions || '',
        imageUrl: initialData.imageUrl || '',
        nutrients: initialData.nutrients || '',
        cookingTime: initialData.cookingTime || ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // If in update mode and recipeId is provided, load the recipe data
    useEffect(() => {
        if (mode === 'update' && recipeId) {
            const recipe = recipeService.getRecipeById(recipeId);
            if (recipe) {
                setFormData({
                    title: recipe.title,
                    instructions: recipe.instructions,
                    imageUrl: recipe.imageUrl,
                    nutrients: recipe.nutrients,
                    cookingTime: recipe.cookingTime
                });
            }
        }
    }, [mode, recipeId]);

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            if (mode === 'add') {
                // Create new recipe
                const newRecipe = recipeService.createRecipe(formData);
                
                if (onSubmit) {
                    onSubmit(formData);
                }
                
                // Reset form after successful submission
                setFormData({
                    title: '',
                    instructions: '',
                    imageUrl: '',
                    nutrients: '',
                    cookingTime: ''
                });
                
                alert('Recipe added successfully!');
            } else if (mode === 'update' && recipeId) {
                // Update existing recipe
                const updatedRecipe = recipeService.updateRecipe(recipeId, formData);
                
                if (onSubmit) {
                    onSubmit(formData);
                }
                
                alert('Recipe updated successfully!');
            }
            
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError('An error occurred while saving the recipe.');
            console.error('Error saving recipe:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-500 mb-6">
                {mode === 'add' ? 'Add Recipe' : 'Edit Recipe'}
            </h2>
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{error}</p>
                </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        placeholder="Recipe title"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Instructions</label>
                    <textarea 
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-32" 
                        placeholder="Cooking instructions"
                        required
                    ></textarea>
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <input 
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        placeholder="Image URL"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Nutrients</label>
                    <input 
                        type="text"
                        name="nutrients"
                        value={formData.nutrients}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        placeholder="Nutrients information"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 mb-2">Cooking Time</label>
                    <input 
                        type="text"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" 
                        placeholder="Approximate cooking time"
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : (mode === 'add' ? 'Save Recipe' : 'Update Recipe')}
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;