import Recipe from "../models/recipe.js";

export const getRecipes = async (req, res) => {
    try {
      const { 
        search, 
        difficulty, 
        type, 
        cuisine, 
        page = 0 
      } = req.query;
      const itemsPerPage = 10;
      const filter = {};
  
      console.log('Request Query Parameters:', req.query);
  
      if (search) {
        filter.$text = { $search: search };
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
  
      if (difficulty) {
        filter.difficulty = difficulty.toLowerCase();
      }
  
      if (type) {
        filter.mealType = type.toLowerCase();
      }
  
      if (cuisine) {
        filter.cuisine = cuisine.toLowerCase();
      }
  
      console.log('Filter:', filter);
  
      const totalRecipes = await Recipe.countDocuments(filter);
      console.log('Total Recipes Count:', totalRecipes);
  
      const recipes = await Recipe.find(filter)
        .populate({
          path: 'author',
          select: 'username'
        })
        .sort({ createdAt: -1 })
        .skip(Number(page) * itemsPerPage)
        .limit(itemsPerPage)
        .lean(); 
  
  
      const totalPages = Math.ceil(totalRecipes / itemsPerPage);
      const hasNext = (Number(page) + 1) < totalPages;
      const hasPrevious = Number(page) > 0;
  
      return res.status(200).json({
        success: true,
        data: {
          recipes,
          pagination: {
            currentPage: Number(page),
            totalPages,
            totalRecipes,
            hasNext,
            hasPrevious,
            itemsPerPage
          }
        }
      });
  
    } catch (error) {
      console.error('Error in getRecipes:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };  

  

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: 'author',
        select: 'username'
      });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error in getRecipeById:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      difficulty,
      prepTime,
      cookTime,
      servings,
      mealType,
      cuisine,
      description,
      ingredients,
      instructions
    } = req.body;

    const recipe = await Recipe.create({
      title,
      author: req.user._id, 
      difficulty,
      prepTime,
      cookTime,
      servings,
      mealType,
      cuisine,
      description,
      ingredients,
      instructions
    });

    return res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error in createRecipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedRecipe
    });
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }

    await recipe.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const rateRecipe = async (req, res) => {
  try {
    const { value } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const existingRating = recipe.rating.ratings.find(
      rating => rating.user.toString() === req.user._id.toString()
    );

    if (existingRating) {
      existingRating.value = value;
    } else {
      recipe.rating.ratings.push({
        user: req.user._id,
        value
      });
    }

    const totalRatings = recipe.rating.ratings.length;
    const ratingSum = recipe.rating.ratings.reduce((sum, rating) => sum + rating.value, 0);
    recipe.rating.average = ratingSum / totalRatings;
    recipe.rating.count = totalRatings;

    await recipe.save();

    return res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error in rateRecipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};