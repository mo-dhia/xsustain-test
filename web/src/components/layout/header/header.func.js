import { useState } from 'react'
import { useLocation } from "react-router-dom"
import { states } from '../../../utils/store.js'
import axios from 'axios'
import links from './links.json'

export const useHeaderLogic = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(-1)
    const { user, setSidePanel } = states();

    const fields = [
        { label: "Title", name: "title", type: "text" },
        { label: "Description", name: "description", type: "textarea" },
    ];

    const updateSelector = (linksContainer, selector) => {
        if (!linksContainer.current) return;

        const pageIndex = links.findIndex(link => location.pathname === link.route)
        setCurrentPage(pageIndex)

        if (pageIndex !== -1) {
            const { offsetLeft, clientWidth } = linksContainer.current.children[pageIndex]

            if (selector.current) {
                selector.current.style.opacity = 1
                selector.current.style.transform = `translateX(${offsetLeft}px)`
                selector.current.style.width = `${clientWidth}px`
            }
        }
    }

    const handleSubmit = (formData) => async (event) => {
        event.preventDefault();
        const { title, description } = formData
        const body = {
            title,
            author: user._id,
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 18,
            servings: 2,
            mealType: 'dinner',
            cuisine: 'tunisian',
            description,
            ingredients: [
                "ingredient 1",
                "ingredient 2",
                "ingredient 3",
                "ingredient 4",
                "ingredient 5",
                "ingredient 6",
                "ingredient 7",
                "ingredient 8",
                "ingredient 9",
                "ingredient 10"
            ],
            "instructions": [
                "step 1: do something",
                "step 2: do something",
                "step 3: do something",
                "step 4: do something",
                "step 5: do something"
            ]
        }
 
        try {
            await axios.post(import.meta.env.VITE_API_URL + 'recipe', body, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setSidePanel(false);
        }
        catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return {
        currentPage,
        updateSelector,
        links,
        fields,
        handleSubmit,
        user,
        setSidePanel
    }
}