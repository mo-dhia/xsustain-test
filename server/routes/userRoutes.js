import { protect } from '../middlewares/auth.js'
import express from 'express'
import { loginValidation, registerValidation } from '../middlewares/userValidation.js';
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} from '../controllers/userController.js'

const router = express.Router();

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router