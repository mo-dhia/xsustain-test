import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipePlatform from './components/RecipePlatform';
import RecipePreview from './components/RecipePreview';
import Signin from './components/signin/signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipePlatform />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signin isSignup />} />
        <Route path="/recipe/:recipeId" element={<RecipePreview />} />
      </Routes>
    </Router>
  );
}

export default App;