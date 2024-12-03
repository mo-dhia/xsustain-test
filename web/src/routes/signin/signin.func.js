import { useState } from 'react';
import axios from 'axios';
import { states } from '../../utils/store.js';

export const useSigninLogic = (isSignup) => {
    const createInitialFormData = () => ({
        email: '',
        password: '',
        confirmPassword: isSignup ? '' : undefined
    });

    const createInputConfigs = () => [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email@example.com'
        },
        {
            name: 'password',
            label: isSignup ? 'Set Password' : 'Password',
            type: 'password',
            placeholder: 'At least 4 characters'
        },
        ...(isSignup ? [{
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'At least 4 characters'
        }] : [])
    ];

    const [formData, setFormData] = useState(createInitialFormData());
    const inputConfigs = createInputConfigs();
    const { setUser, user } = states();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                if (!formData.password || formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match");
                } else {
                    const { data } = await axios.post(import.meta.env.VITE_API_URL + 'users/register', formData);
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                }
            } else {
                const { data } = await axios.post(import.meta.env.VITE_API_URL + 'users/login', formData);
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            }
        } catch (error) {
            alert(error?.response?.data?.message || 'User not found');
        }
    };

    return { formData, setFormData, inputConfigs, handleFormSubmit, user };
};