import React, { useState, useEffect, useRef } from 'react';
import styles from '../recipes.module.css';
import { debounce } from '../../../utils/utils';
import { MingcuteSearchLine, PhCaretDownBold } from '../../../components/svgs/svg';

export default function RecipeFilters({ searchParams, setSearchParams, searchInput }) {
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

    const handleSearchChange = (e, setFilters, debouncedSearch) => {
        const value = e.target.value;
        setFilters(prev => ({ ...prev, search: value }));
        debouncedSearch(value);
    };

    const handleSelectChange = (key, value, filters, setFilters, searchParams, setSearchParams, setActiveDropdown) => {
        const paramKey = key === 'Meal Type' ? 'type' : key;
        const newFilters = {
            ...filters,
            [paramKey.toLowerCase()]: value.toLowerCase()
        };

        setFilters(newFilters);
        updateQueryParams(searchParams, setSearchParams, newFilters);
        setActiveDropdown(null);
    };

    const toggleDropdown = (key, activeDropdown, setActiveDropdown) => {
        setActiveDropdown(activeDropdown === key ? null : key);
    };





    return (
        <div className={styles.container}>
            {searchParams.has('search') && (
                <div className={styles.searchContainer}>
                    <input
                        ref={searchInput}
                        value={filters.search}
                        onChange={(e) => handleSearchChange(e, setFilters, debouncedSearch)}
                        placeholder='Search'
                        className={styles.searchInput}
                    />
                    <MingcuteSearchLine className={styles.searchIcon} />

                    {Object.entries(SELECTS).map(([key, values]) => {
                        const paramKey = key === 'Meal Type' ? 'type' : key.toLowerCase();
                        const currentValue = filters[paramKey] === 'all'
                            ? 'All'
                            : filters[paramKey].charAt(0).toUpperCase() + filters[paramKey].slice(1);

                        return (
                            <div
                                key={key}
                                className={styles.selectWrapper}
                                onClick={() => toggleDropdown(key, activeDropdown, setActiveDropdown)}
                            >
                                <div className={styles.selectLabel}>{key}</div>
                                <PhCaretDownBold className={styles.caretIcon} />
                                <div>{currentValue}</div>

                                <div
                                    className={styles.dropdownMenu}
                                    style={
                                        activeDropdown === key
                                            ? { padding: '1vw .2vw', maxHeight: '20vw', opacity: 1 }
                                            : { padding: '.2vw', maxHeight: 0, opacity: 0 }
                                    }
                                >
                                    <div
                                        className={styles.dropdownItem}
                                        onClick={() => handleSelectChange(key, 'all', filters, setFilters, searchParams, setSearchParams, setActiveDropdown)}
                                    >
                                        All
                                    </div>
                                    {values.map((value) => (
                                        <div
                                            key={value}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectChange(key, value, filters, setFilters, searchParams, setSearchParams, setActiveDropdown);
                                            }}
                                            className={styles.dropdownItem}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}