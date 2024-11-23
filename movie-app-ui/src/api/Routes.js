import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import LoginPanel from '../components/auth/loginPanel/LoginPanel';
import Logout from '../components/auth/logout/Logout';
import RegisterPanel from '../components/auth/registerPanel/RegisterPanel';
import MovieList from '../components/homePage/MovieList';
import MovieDetails from '../components/homePage/MovieDetails';
import FavoritesPanel from '../components/homePage/FavoritesList';

export const routes = (isLoggedIn, setIsLoggedIn) => (
  <>
    <Route
      path="/auth/login"
      element={isLoggedIn ? <Navigate to="/movies" /> : <LoginPanel setIsLoggedIn={setIsLoggedIn}/>}
    />
    <Route
      path="/auth/register"
      element={isLoggedIn ? <Navigate to="/movies" /> : <RegisterPanel />}
    />
    <Route
      path="/movies"
      element={isLoggedIn ? <MovieList /> : <Navigate to="/auth/login" />}
    />
    <Route
      path="/movie/:id"
      element={isLoggedIn ? <MovieDetails /> : <Navigate to="/auth/login" />}
    />
    <Route
      path="/favorites"
      element={isLoggedIn ? <FavoritesPanel /> : <Navigate to="/auth/login" />}
    />
    <Route
      path="/auth/logout"
      element={<Logout setIsLoggedIn={setIsLoggedIn} />}
    />
    <Route
      path="*"
      element={<Navigate to={isLoggedIn ? "/movies" : "/auth/login"} />}
    />
  </>
);
