import { useEffect, useState } from 'react';
import axios from 'axios';
import { states } from '../../utils/store';

export const useAccountLogic = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const { user, setUser, setSidePanel } = states();

    const handleSubmit = (formData) => async (event) => {
        event.preventDefault();

        if (!formData.password || formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { data } = await axios.put(import.meta.env.VITE_API_URL + 'users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setSidePanel(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    useEffect(() => {
        if (user?.token) {
            axios.get(import.meta.env.VITE_API_URL + 'users/profile', {
                headers: {
                    Authorization: `Bearer ` + user.token
                }
            }).then(r => {
                const { user, createdRecipes, savedRecipes } = r.data;

                setSavedRecipes(savedRecipes);
                setCreatedRecipes(createdRecipes);
            });
        }
    }, [user]);

    return {
        savedRecipes,
        createdRecipes,
        handleSubmit,
        setUser,
        setSidePanel
    };
}