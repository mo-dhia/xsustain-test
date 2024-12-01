import { body } from 'express-validator'

export const registerValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 4 })
];

export const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
];