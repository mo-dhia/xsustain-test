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
      enum: ['easy', 'medium', 'hard'],
      required: true,
      lowercase: true 
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
      enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'],
      required: true,
      lowercase: true 
    },
    cuisine: {
      type: String,
      enum: ['italian', 'american', 'chinese', 'indian', 'mexican', 'french', 'japanese', 'african', 'mediterranean', 'tunisian'],
      required: true,
      lowercase: true 
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

  recipeSchema.index({ title: 'text', description: 'text' });
  
export default mongoose.model('Recipe', recipeSchema);


