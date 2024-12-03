import React from 'react';
import { LineMdClose, MingcuteSearchLine, PhCaretDownBold } from '../../../components/svgs/svg';
import { useRecipeFiltersLogic } from './recipeFilters.func';
import styles from './recipeFilters.module.css';

export default function RecipeFilters({ searchParams, setSearchParams, searchInput }) {
  const {
    filters,
    activeDropdown,
    handleSearchChange,
    handleSelectChange,
    toggleDropdown,
    SELECTS,
    onClose
  } = useRecipeFiltersLogic(searchParams, setSearchParams);

  return (
    <div className={styles.container} >
      {searchParams.has('search') && (
        <div className={styles.searchContainer}>
          <LineMdClose className={styles.exit} onClick={onClose}  />
          <input
            ref={searchInput}
            value={filters.search}
            onChange={handleSearchChange}
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
                onClick={() => toggleDropdown(key)}
              >
                <div className={styles.selectLabel}>{key}</div>
                <PhCaretDownBold className={styles.caretIcon} />
                <div>{currentValue}</div>

                <div className={`${styles.dropdownMenu} ${activeDropdown === key ? styles.active : ''}`}>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => handleSelectChange(key, 'all')}
                  >
                    All
                  </div>
                  {values.map((value) => (
                    <div
                      key={value}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectChange(key, value);
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