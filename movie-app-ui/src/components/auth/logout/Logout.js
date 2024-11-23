import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../../api/AuthAPI';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Usuwamy token z pamięci przeglądarki
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        await AuthAPI.logout();

        navigate('/auth/login');
      } catch (error) {
        console.error('Błąd wylogowania:', error);

        navigate('/');
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Trwa wylogowywanie...</div>;
};

export default Logout;
