import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './api/Routes';
import Header from './components/header/Header';
import Cookies from 'js-cookie';
import './App.css';
import {jwtDecode} from "jwt-decode";

function App() {

    const [role, setRole] = useState(false);
    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.is_admin);
                console.log(decodedToken.is_admin);
            } catch (error) {
                console.error('Błąd dekodowania tokenu', error);
            }
        }
    },[])

    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={role}/>
        <Routes>
          {routes(isLoggedIn, setIsLoggedIn, role)}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
