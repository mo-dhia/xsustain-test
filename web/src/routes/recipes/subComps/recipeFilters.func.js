import { useState, useRef } from 'react';
import { debounce } from '../../../utils/utils';

export const useRecipeFiltersLogic = (searchParams, setSearchParams) => {
    const getInitialValues = (searchParams) => ({
        search: searchParams.get('search') || '',
        difficulty: searchParams.get('difficulty') || 'all',
        type: searchParams.get('type') || 'all',
        cuisine: searchParams.get('cuisine') || 'all'
    });

    const [filters, setFilters] = useState(getInitialValues(searchParams));
    const [activeDropdown, setActiveDropdown] = useState(null);

    const debouncedSearch = useRef(
        debounce((value) => {
            updateQueryParams(searchParams, setSearchParams, { search: value });
        }, 500)
    ).current;

    const updateQueryParams = (searchParams, setSearchParams, updates) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== 'all') {
                newParams.set(key.toLowerCase(), value.toLowerCase());
            } else if (key === 'search') {
                newParams.set('search', '');
            } else {
                newParams.delete(key.toLowerCase());
            }
        });

        setSearchParams(newParams);
    };

    const SELECTS = {
        "Difficulty": ['Easy', 'Medium', 'Hard'],
        "Meal Type": ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        "Cuisine": ['Italian', 'Mexican', 'Chinese', 'Indian', 'American']
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setFilters(prev => ({ ...prev, search: value }));
        debouncedSearch(value);
    };

    const handleSelectChange = (key, value) => {
        const paramKey = key === 'Meal Type' ? 'type' : key;
        const newFilters = {
            ...filters,
            [paramKey.toLowerCase()]: value.toLowerCase()
        };

        setFilters(newFilters);
        updateQueryParams(searchParams, setSearchParams, newFilters);
        setActiveDropdown(null);
    };

    const toggleDropdown = (key) => {
        setActiveDropdown(activeDropdown === key ? null : key);
    };

    const onClose = () => {
        const newParams = new URLSearchParams(searchParams);
        Object.keys(filters).forEach(key => {
            newParams.delete(key.toLowerCase());
        });
        setSearchParams(newParams);

      
    }
    return {
        filters,
        activeDropdown,
        handleSearchChange,
        handleSelectChange,
        toggleDropdown,
        SELECTS,
        onClose
    };
};