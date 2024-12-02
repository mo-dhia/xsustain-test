import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { generateToken } from '../utils.js';


// Register user
export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email,
            password,
            role: 'user'
        });

        console.log('User created:', user);
        if (!user) {
            return res.status(400).json({ message: 'Failed to create user' });
        }

        return res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update email if provided
        if (req.body.email && req.body.email !== user.email) {
            // Check if email already exists
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.email = req.body.email;
        }

        if (req.body.password) {
            if (req.body.currentPassword) {
                const isMatch = await user.comparePassword(req.body.currentPassword);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Current password is incorrect' });
                }
            }

            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        return res.json({
            _id: updatedUser._id,
            email: updatedUser.email,
            role: updatedUser.role,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export default {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
};