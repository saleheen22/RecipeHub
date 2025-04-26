import React, { useState } from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
import RecipeList from '../RecipeList';
import Footer from '../Footer';

const HomeLayout = () => {
    // Create a shared reference to refresh recipes
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    // Function to refresh recipes
    const refreshRecipes = () => {
        setRefreshTrigger(prev => prev + 1);
    };
    
    return (
        <div>
            <Navbar onRecipeChange={refreshRecipes} />
            <Hero />
            <RecipeList key={refreshTrigger} />
            <Footer />
        </div>
    );
};

export default HomeLayout;