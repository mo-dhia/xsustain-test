import { body } from 'express-validator'
import express from 'express'
import {
    registerUser,
    loginUser,
} from '../controllers/userController.js'

const router = express.Router();


// Validation middleware
const registerValidation = [
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 4 })
];

const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
];

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router