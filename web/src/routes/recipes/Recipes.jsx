import React from 'react';
import RecipeFilters from './subComps/recipeFilters';
import RecipeList from '../../components/recipeList/recipeList';
import { useRecipesLogic } from './recipes.func';
import styles from './recipes.module.css';

export default function Recipes() {
  const {
    data,
    filtersProps,
    searchInput
  } = useRecipesLogic();

  return (
    <div className={styles.container}>
      <RecipeFilters {...filtersProps} searchInput={searchInput} />
      <RecipeList recipes={data?.recipes} />
    </div>
  );
}