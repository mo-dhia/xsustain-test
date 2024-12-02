

export const updateQueryParams = (searchParams, setSearchParams, updates) => {
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

export const getInitialValues = (searchParams) => ({
    search: searchParams.get('search') || '',
    difficulty: searchParams.get('difficulty') || 'all',
    type: searchParams.get('type') || 'all',
    cuisine: searchParams.get('cuisine') || 'all'
});

export const SELECTS = {
    "Difficulty": ['Easy', 'Medium', 'Hard'],
    "Meal Type": ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    "Cuisine": ['Italian', 'Mexican', 'Chinese', 'Indian', 'American']
};

export const handleSearchChange = (e, setFilters, debouncedSearch) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    debouncedSearch(value);
};

export const handleSelectChange = (key, value, filters, setFilters, searchParams, setSearchParams, setActiveDropdown) => {
    const paramKey = key === 'Meal Type' ? 'type' : key;
    const newFilters = {
        ...filters,
        [paramKey.toLowerCase()]: value.toLowerCase()
    };

    setFilters(newFilters);
    updateQueryParams(searchParams, setSearchParams, newFilters);
    setActiveDropdown(null);
};

export const toggleDropdown = (key, activeDropdown, setActiveDropdown) => {
    setActiveDropdown(activeDropdown === key ? null : key);
};

export const logSearchParams = (searchParams) => {
    const paramsObject = {};
    searchParams.forEach((value, key) => {
        paramsObject[key] = value;
    });
    console.log('Current search parameters:', paramsObject);
};