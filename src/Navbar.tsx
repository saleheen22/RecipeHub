import React from 'react';
import RecipeForm from './RecipeForm';

// Define props type to accept a refresh function
interface NavbarProps {
  onRecipeChange?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRecipeChange }) => {
   
    // Handle successful recipe submission
    const handleRecipeSuccess = () => {
        // Close the modal after successful submission
        document.getElementById('my_modal_3')?.close();
        
        // Call the refresh function to update the recipe list
        if (onRecipeChange) {
            onRecipeChange();
        }
    };
   
    return (
        <div className='sticky top-0 z-50 bg-base-200'>
            <div className="navbar max-w-7xl w-full mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                    </div>
                    <a className="text-3xl font-bold">Recipe <span className='italic text-red-500'>Hub</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl">
                        <li><a>Nutrients</a></li>
                        <li><a>Menu</a></li>
                        <li><a>Ingredients</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button 
                        className="btn p-4 text-xl font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg gap-2"
                        onClick={() => document.getElementById('my_modal_3')?.showModal()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Submit Recipe
                    </button>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <RecipeForm 
                        mode="add" 
                        onSuccess={handleRecipeSuccess}
                    />
                </div>
            </dialog>
        </div>
    );
};

export default Navbar;