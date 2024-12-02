import mongoose from 'mongoose';
import mockRecipes from './data.js';
import recipe from '../models/recipe.js';



async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/recipe-platform');
        console.log('Connected to MongoDB');

        await recipe.deleteMany({});
        console.log('Cleared existing recipes');

        const insertedRecipes = await recipe.insertMany(mockRecipes.map(recipe => {
            const transformedRecipe = { ...recipe };
            
            transformedRecipe.title = recipe.title;
            transformedRecipe.description = recipe.description;

            transformedRecipe.difficulty = recipe.difficulty.toLowerCase();
            transformedRecipe.mealType = recipe.mealType.toLowerCase();
            transformedRecipe.cuisine = recipe.cuisine.toLowerCase();
            transformedRecipe.ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
            transformedRecipe.instructions = recipe.instructions.map(instruction => instruction.toLowerCase());

            return transformedRecipe;
        }));

        console.log(`Successfully inserted ${insertedRecipes.length} recipes`);

        const mockRatingsAndSaves = await Promise.all(insertedRecipes.map(async (recipe) => {
            recipe.rating.ratings.push({
                user: '674c7d3356ba8ee1e2448c44',
                value: 4
            });
            recipe.rating.average = 4;
            recipe.rating.count = 1;

            recipe.savedBy.push({
                user: '674c7d3356ba8ee1e2448c44',
                savedAt: new Date()
            });

            return recipe.save();
        }));

        console.log('Added ratings and saves to recipes');
        console.log('Database seeding completed successfully');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

seedDatabase();