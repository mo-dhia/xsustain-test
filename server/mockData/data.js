
const AUTHOR_ID = '674c7d3356ba8ee1e2448c44';

const titles = [
    "Butter Chicken",
    "Japanese Pancakes",
    "Tacos al Pastor",
    "Beef Wellington",
    "Pad Thai",
    "Greek Moussaka",
    "French Onion Soup",
    "Vegetable Stir-fry",
    "Crispy Fried Chicken",
    "Shrimp Scampi",
    "Spaghetti Carbonara",
    "Vegetarian Lasagna",
    "Chocolate Chip Cookies",
    "Banana Bread",
    "Caesar Salad",
    "Eggs Benedict",
    "Tom Kha Gai",
    "Falafel Wraps",
    "Ratatouille",
    "Korean Bibimbap"
];

const descriptions = [
    "Creamy, rich Indian curry with tender chicken pieces",
    "Fluffy, souffle-like pancakes that are light as air",
    "Mexican street tacos with marinated pork and pineapple",
    "Elegant pastry-wrapped beef dish for special occasions",
    "Stir-fried Thai noodles with tamarind, shrimp, and tofu",
    "Rich eggplant and lamb casserole with béchamel sauce",
    "Warm and savory soup topped with melted cheese and croutons",
    "Quick and healthy stir-fry with a mix of fresh vegetables",
    "Crispy, golden fried chicken perfect for any occasion",
    "Garlicky shrimp pasta in a buttery white wine sauce",
    "Classic Italian pasta dish with eggs, cheese, and pancetta",
    "Hearty and wholesome vegetarian lasagna with spinach and ricotta",
    "Classic cookies with gooey chocolate chips in every bite",
    "Moist, sweet bread made with ripe bananas",
    "Fresh romaine lettuce with creamy Caesar dressing",
    "Poached eggs on English muffins with hollandaise sauce",
    "Thai coconut soup with chicken and lemongrass",
    "Crispy chickpea patties wrapped in soft pita bread",
    "Traditional Provençal vegetable stew",
    "Korean rice bowl with assorted vegetables, beef, and egg"
];

const difficulties = ["Easy", "Medium", "Hard"];
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];
const cuisines = ["Italian", "American", "Chinese", "Indian", "Mexican", "French", "Japanese", "African", "Mediterranean"];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockRecipes = [
    {
        title: "Classic Margherita Pizza",
        author: AUTHOR_ID, 
        difficulty: "Medium",
        prepTime: 30,
        cookTime: 15,
        servings: 4,
        mealType: "Dinner",
        cuisine: "Italian",
        description: "Traditional Neapolitan pizza with fresh basil, mozzarella, and tomatoes",
        ingredients: [
            "2 cups all-purpose flour",
            "1 cup warm water",
            "2 1/4 tsp active dry yeast",
            "Fresh mozzarella",
            "Fresh basil leaves",
            "San Marzano tomatoes",
            "Olive oil",
            "Salt"
        ],
        instructions: [
            "Make the pizza dough by combining flour, water, yeast, and salt",
            "Let dough rise for 1 hour",
            "Stretch dough into circle",
            "Top with crushed tomatoes, mozzarella, and basil",
            "Bake at 500°F for 12-15 minutes"
        ]
    }
];

titles.forEach((title, index) => {
    mockRecipes.push({
        title,
        author: AUTHOR_ID, 
        difficulty: getRandomElement(difficulties),
        prepTime: getRandomNumber(10, 60),
        cookTime: getRandomNumber(10, 60),
        servings: getRandomNumber(2, 8),
        mealType: getRandomElement(mealTypes),
        cuisine: cuisines[index % cuisines.length],
        description: descriptions[index],
        ingredients: Array.from(
            { length: getRandomNumber(5, 10) },
            (_, i) => `Ingredient ${i + 1}`
        ),
        instructions: Array.from(
            { length: getRandomNumber(4, 8) },
            (_, i) => `Step ${i + 1}: Do something`
        )
    });
});

export default mockRecipes;
