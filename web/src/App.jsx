import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Signin from './components/signin/signin';
// import RecipePreview from './components/recipePreview/recipePreview';
import Home from './components/Home/Home';
import Categories from './components/categories/categories';
import Recipes from './components/Recipes/Recipes';
import Account from './components/account/account';


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
          {/* <Route path="/recipe/:recipeId" element={<RecipePreview />} /> */}
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;