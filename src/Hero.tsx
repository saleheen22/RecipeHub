import React from 'react';
import heroImage from './assets/hero.jpg';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    return (
        <div className="hero min-h-[70vh]" style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-5 md:text-5xl xl:text-7xl font-bold">
                        <Typewriter
                            options={{
                                strings: ['Perfect Recipes', 'Tasty Meals', 'Quick Dinners', 'Healthy Options', 'Easy Cooking'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </h1>
                    <p className="mb-5 text-lg md:text-xl lg:text-2xl">Discover thousands of recipes for every meal, cuisine, and dietary preference. From quick weeknight dinners to special occasions.</p>
                    <button className="btn bg-red-500 hover:bg-red-600 text-white border-none">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;