import axios from "axios";



export const fetchRecipes = async (searchParams, setData, isPagination, scrollPage = 0) => {
    const params = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + 'recipe', {
            params: {
                ...params,
                page: scrollPage,
            }
        });
        const { recipes, pagination } = data.data

        setData(prev => isPagination ? ({ recipes: [...prev.recipes, ...recipes], pagination }) : { recipes, pagination });
    } catch (error) {
        console.log(error);
    }

}








import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';



export const useRecipesLogic = () => {
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

  return {
    data,
    filtersProps,
    searchInput
  };
};