import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true
    },
    prepTime: {
      type: Number,
      required: true
    },
    cookTime: {
      type: Number,
      required: true
    },
    servings: {
      type: Number,
      required: true
    },
    rating: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      },
      ratings: [{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        value: {
          type: Number,
          min: 1,
          max: 5
        }
      }]
    },
    mealType: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
      required: true
    },
    cuisine: {
      type: String,
      enum: ['Italian', 'American', 'Chinese', 'Indian', 'Mexican', 'French', 'Japanese', 'African', 'Mediterranean'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: [{
      type: String,
      required: true
    }],
    instructions: [{
      type: String,
      required: true
    }],
    savedBy: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      savedAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
export default mongoose.model('Recipe', recipeSchema);


