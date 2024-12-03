import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { states } from '../../utils/store';

export const useRecipePreviewLogic = () => {
    const [recipe, setRecipe] = useState(null);
    const { user, setUser, setSidePanel } = states();
    const navigate = useNavigate();
    const randomImageIndex = Math.floor(Math.random() * 4);

    const mockNutrition = { protein: '45g', carbs: '50g', fats: '40g', sugar: '2g', fiber: '3g' };
    
    const sections = [
        { title: 'nutrition', content: Object.entries(mockNutrition) },
        { title: 'ingredients', content: recipe?.ingredients || [] },
        { title: 'instructions', content: recipe?.instructions || [] }
    ];

    const stats = [
        { value: recipe?.ingredients?.length || 0, label: 'ingredients' },
        { value: (recipe?.prepTime + recipe?.cookTime) || 0, label: 'minutes' },
        { value: recipe?.servings || 0, label: 'servings' },
        { value: 720, label: 'calories' }
    ];

    const fields = [
        { label: "Title", name: "title", type: "text" },
        { label: "Description", name: "description", type: "textarea" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = window.location.href;
                const id = url.split('/').pop();
                const { data } = await axios.get('http://localhost:5000/api/recipe/' + id);
                setRecipe(data.data);
            } catch (error) {
                console.error('Error fetching the recipe:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (formData) => async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put(import.meta.env.VITE_API_URL + 'recipe/' + recipe._id, formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setRecipe(data.data);
            setSidePanel(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + 'recipe/' + recipe._id, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setSidePanel(false);
            navigate(-1);
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    return {
        recipe,
        user,
        navigate,
        handleSubmit,
        handleDelete,
        setSidePanel,
        randomImageIndex,
        fields,
        stats,
        sections
    };
};