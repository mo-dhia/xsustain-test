import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import RecipeFilters from './subComps/filters';
import { useSearchParams } from 'react-router-dom';
import { fetchRecipes } from './recipes.func';
import RecipeList from '../../components/recipeList/recipeList';

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ recipes: [], pagination: {} });
  const [isLoading, setIsLoading] = useState(false);
  const searchInput = useRef(null);

  const handleScroll = useCallback(async () => {
    const { currentPage, totalPages } = data.pagination;
    const isNearBottom =
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100;

    if (isNearBottom && currentPage < totalPages - 1 && !isLoading) {
      setIsLoading(true);
      await fetchRecipes(searchParams, setData, true, currentPage + 1);
      setIsLoading(false);
    }
  }, [data.pagination, isLoading, searchParams]);

  useEffect(() => {
    const hasSearchParam = searchParams.has('search');
    if (hasSearchParam && searchInput.current) {
      searchInput.current.focus();
    }
    fetchRecipes(searchParams, setData, false);
  }, []); 

  useEffect(() => {
    fetchRecipes(searchParams, setData, false);
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const filtersProps = useMemo(() => ({
    setData,
    searchParams,
    setSearchParams
  }), [setData, searchParams, setSearchParams]);

  return (
    <div style={{ marginTop: '7.5vw' }}>
      <RecipeFilters {...filtersProps} searchInput={searchInput} />
      <RecipeList recipes={data?.recipes} />
    </div>
  );
}
