# 🍲 RecipeHub

RecipeHub is a web application for creating, storing, and managing your favorite recipes. This application is built with React, TypeScript, and uses Tailwind CSS for styling and DaisyUI for components.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Using the Application](#using-the-application)
  - [Adding Recipes](#adding-recipes)
  - [Finding Images](#finding-images)
  - [Editing Recipes](#editing-recipes)
  - [Deleting Recipes](#deleting-recipes)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)

## Overview

RecipeHub lets you create and manage your personal recipe collection. All data is stored in your browser's local storage, so there's no need for a server or database. The app provides a simple and intuitive interface for adding, editing, and deleting recipes.

## Features

- Create and save new recipes
- Edit existing recipes
- Delete recipes you no longer need
- Search for recipes by title
- Responsive design for desktop and mobile devices
- Local storage persistence (your recipes stay even after you close the browser)
- No account required - start using immediately

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

1. **Git** - For cloning the repository
   - Download and install from [git-scm.com](https://git-scm.com/downloads)
   - During installation, select the option to add Git to your PATH

2. **Node.js and npm** - For running the application
   - Download and install from [nodejs.org](https://nodejs.org/) (choose the LTS version)
   - This will install both Node.js and npm

3. **Visual Studio Code** - Recommended editor
   - Download and install from [code.visualstudio.com](https://code.visualstudio.com/download)

### Installation

1. **Clone the repository**
   
   Open your terminal (Command Prompt on Windows or Terminal on Mac/Linux) and run:

If you're not familiar with the terminal, you can also:
- Open Visual Studio Code
- Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)
- Type "Git: Clone" and press Enter
- Paste the repository URL and select a folder to save it

2. **Install dependencies**

In the terminal (or Visual Studio Code's integrated terminal), run:

3. **Start the application**

Run:

4. **Open in your browser**

The application will typically be available at http://localhost:5173/

## Using the Application

### Adding Recipes

1. Click the "Submit Recipe" button in the navigation bar
2. Fill in the recipe details:
- Title (required)
- Instructions (required)
- Image URL (optional)
- Nutrients information (optional)
- Cooking time (optional)
3. Click "Save Recipe"

### Finding Images

You can use free images from websites like Freepik:

1. Go to [Freepik](https://www.freepik.com/)
2. Search for "food" or a specific dish
3. Find an image you like and click on it
4. Right-click on the larger preview image and select "Open image in new tab"
5. Copy the URL from the address bar
6. Paste this URL into the "Image URL" field in the recipe form

### Editing Recipes

1. Find the recipe you want to edit
2. Click the pencil icon (✏️) on the recipe card
3. Make your changes in the form
4. Click "Update Recipe"

### Deleting Recipes

1. Find the recipe you want to delete
2. Click the trash icon (🗑️) on the recipe card
3. Confirm deletion when prompted

## How It Works

RecipeHub uses your browser's local storage to save all recipe data directly on your device. This means:

- No account creation or login required
- Your data stays private on your machine
- The app works even without an internet connection (after initial load)
- Your recipes will persist between sessions until you clear your browser data

## Project Structure

The project is organized into several key components:

- **Navbar**: Navigation bar with the "Submit Recipe" button
- **Hero**: Main banner with typewriter effect and call-to-action
- **RecipeList**: Displays all recipes with search functionality
- **RecipeForm**: Form for adding and editing recipes
- **Recipe**: Individual recipe display component
- **recipeService**: Handles data operations (create, read, update, delete)

All recipe data is stored in your browser's localStorage under the key `recipehub_recipes`.

---

Happy cooking! 🍳👨‍🍳👩‍🍳