import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaVideo } from 'react-icons/fa';
import Cookies from 'js-cookie';

import { UserAPI } from '../../api/UserAPI';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      

      Cookies.remove('authToken');
      setIsLoggedIn(false);
      await UserAPI.logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/movies" style={{ color: 'white' }}>
          <FaVideo size={30} style={{ justifyContent: 'center', marginRight: '5pt' }} />
          movie app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link className="nav-link" to="/favorites">
              Favourites
            </Link>
          </Nav>
          {isLoggedIn ? (
            <Button variant="outline-info" className="me-2" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="outline-info" className="me-2">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="outline-info">Register</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
