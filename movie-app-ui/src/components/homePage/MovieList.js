import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { MoviesAPI } from '../../api/MoviesAPI'; // Importujemy API
import { UserAPI } from '../../api/UserAPI'; // Importujemy UserAPI
import { Card, Button, Row, Col, Container, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Ikony gwiazdek

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Filmy
  const [favorites, setFavorites] = useState([]); // Ulubione filmy
  const [error, setError] = useState(null); // Błąd
  const [loading, setLoading] = useState(true); // Loading

  const getUserId = () => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.id; 
      } catch (error) {
        console.error('Błąd dekodowania tokenu', error);
      }
    }
    return null; // Zwracamy null, jeśli token nie istnieje
  };
  const userId = getUserId();
  

  // Pobierz filmy oraz ulubione filmy
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesData = await MoviesAPI.getAllMovies();
        console.log(moviesData);
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Błąd przy pobieraniu filmów:', error);
        setError('Nie udało się pobrać filmów.');
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const favoritesData = await UserAPI.getFavorites(userId); // Pobieramy ulubione filmy
        setFavorites(favoritesData.map(fav => fav.movie_id)); // Ustawiamy tylko ID filmów w ulubionych
      } catch (error) {
        console.error('Błąd przy pobieraniu ulubionych:', error);
      }
    };

    fetchMovies();
    fetchFavorites(); // Dodajemy wywołanie funkcji pobierania ulubionych
  }, [userId]); // Tylko przy załadowaniu komponentu

  // Funkcja do obsługi kliknięcia na gwiazdkę
  const handleFavoriteClick = async (movieId) => {
    try {
      if (favorites.includes(movieId)) {
        await UserAPI.removeFavorite(userId, movieId);  // Usuwamy film
        setFavorites(favorites.filter(id => id !== movieId));
      } else {
        await UserAPI.addFavorite(userId, movieId); // Dodajemy film do ulubionych
        setFavorites([...favorites, movieId]);
      }
    } catch (error) {
      console.error('Błąd przy dodawaniu/usuwaniu filmu do ulubionych:', error);
    }
  };

  // Sprawdzenie stanu ładowania
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4 text-light">All movies</h1>
      {error && <Toast>{error}</Toast>}
      <Row>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.imgUrl || 'https://via.placeholder.com/150'}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/movie/${movie._id}`}>
                      <Button variant="primary">Zobacz szczegóły</Button>
                    </Link>
                    <div
                      className="favorite-icon"
                      onClick={() => handleFavoriteClick(movie._id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {favorites.includes(movie._id) ? (
                        <FaStar size={30} color="gold" />
                      ) : (
                        <FaRegStar size={30} color="gray" />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Brak filmów do wyświetlenia.</p>
        )}
      </Row>
    </Container>
  );
};

export default MovieList;
