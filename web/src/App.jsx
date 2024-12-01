import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Signin from './components/signin/signin';
import RecipePlatform from './components/RecipePlatform';
import RecipePreview from './components/RecipePreview';


function App() {


  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signin isSignup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RecipePlatform />} />
          <Route path="/recipe/:recipeId" element={<RecipePreview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;