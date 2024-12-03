import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Home from './routes/Home/Home'
import Categories from './routes/categories/categories'
import Recipes from './routes/recipes/Recipes';
import RecipePreview from './routes/recipePreview/recipePreview';
import Signin from './routes/signin/signin'
import Account from './routes/account/account';


function App() {


  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signin isSignup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:recipeId" element={<RecipePreview />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;