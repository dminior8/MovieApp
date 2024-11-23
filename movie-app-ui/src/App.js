import React, { useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './api/Routes';
import Header from './components/header/Header';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {routes(isLoggedIn, setIsLoggedIn)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
