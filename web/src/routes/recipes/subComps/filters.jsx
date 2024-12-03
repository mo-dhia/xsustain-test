import React, { useState, useEffect, useRef } from 'react';
import styles from '../recipes.module.css';
import { updateQueryParams, getInitialValues, SELECTS, handleSearchChange, handleSelectChange, toggleDropdown } from '../recipes.func';
import { debounce } from '../../../utils/utils';
import { MingcuteSearchLine, PhCaretDownBold } from '../../../components/svgs/svg';

export default function RecipeFilters({ searchParams, setSearchParams, searchInput }) {
    const [filters, setFilters] = useState(getInitialValues(searchParams));
    const [activeDropdown, setActiveDropdown] = useState(null);

    const debouncedSearch = useRef(
        debounce((value) => {
            updateQueryParams(searchParams, setSearchParams, { search: value });
        }, 500)
    ).current;




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