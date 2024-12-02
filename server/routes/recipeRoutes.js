import express from 'express';
import { 
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  rateRecipe
} from '../controllers/recipeController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipeById);

router.post('/', protect, createRecipe);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.post('/:id/rate', protect, rateRecipe);

export default router;