import React, { useEffect, useState } from 'react'
import RecipeFilters from './subComps/filters'
import RecipeList from './subComps/list';

export default function Recipes() {
  const [data, setData] = useState({ recipes: [], pagination: {} })

  useEffect(() => {
    console.log(data, 'aze');
  }, [data])
  return (
    <div style={{ marginTop: '7.5vw' }}>
      <RecipeFilters setData={setData} />
      <RecipeList recipes={data?.recipes} />
    </div>
  )
}
