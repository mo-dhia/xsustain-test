import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MingcuteSearchLine } from '../svgs/svg';

export default function Recipes() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const searchInput = useRef(null)
  const initialRef = useRef(false)

  useEffect(() => {
    const hasSearchParam = searchParams.has('search');
    if (hasSearchParam && !initialRef.current) {
      searchInput.current.focus()
      initialRef.current = true
    }
  }, [searchParams, searchQuery]);

  const SELECTS = {
    "Difficulty": ['Easy', 'Medium', 'Hard'],
    "Meal Type": ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    "Cuisine": ['Italian', 'Mexican', 'Chinese', 'Indian', 'American']
  }


  return (
    <div style={{ zIndex: 1, position: 'relative' }}>
      {searchParams.has('search') && (
        <div style={{ width: '100%', height: '3vw', marginTop: '7.5vw', display: 'flex', gap: '.5vw', alignItems: 'center', position: 'relative', borderRadius: '1.2vw' }} >
          <input
            ref={searchInput}
            placeholder='Search' style={{
              width: '60%', height: '100%', borderRadius: 'inherit', border: 'none', padding: '0 1vw 0 2.5vw', fontSize: '1vw', color: 'var(--ac-primary)', background: 'var(--bg-elevated)'
            }}
          />
          <MingcuteSearchLine style={{
            position: 'absolute', left: '.75vw', top: '50%', transform: 'translateY(-50%)', width: '1.5vw', height: '1.5vw', color: 'var(--ac-primary)', zIndex: 1
          }}
          />

          {Object.entries(SELECTS).map((element, index) => {
            const [key, values] = element

            return <div key={index} style={{ flex: 1, background: 'var(--bg-select)', height: '100%', borderRadius: 'inherit', minWidth: 0, position: 'relative' }} >
              <div style={{ position: 'absolute', color: 'var(--ac-primary)', right: 0, top: 0, transform: 'translate(-1vw, calc(-100% - .1vw))', fontSize: '.9vw' }}>
                {key}
              </div>
              
            </div>
          })}

        </div>
      )}
    </div>
  )
}