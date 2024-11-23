import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesAPI } from '../../api/MoviesAPI'; // Importujemy API
import { Container, Card, Button, Spinner, ListGroup } from 'react-bootstrap'; // Dodajemy Spinner i ListGroup

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Pobranie szczegółów filmu oraz powiązanych informacji (aktorzy, kraj, reżyserzy, gatunki)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true); 

        const movieData = await MoviesAPI.getMovieById(id); 
        setMovie(movieData); 

        const actorsData = await MoviesAPI.getActors();
        setActors(actorsData);

        const countriesData = await MoviesAPI.getCountries();
        setCountries(countriesData);

        const directorsData = await MoviesAPI.getDirectors();
        setDirectors(directorsData);

        const genresData = await MoviesAPI.getGenres();
        setGenres(genresData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Błąd przy pobieraniu filmu:', error);
        setError('Nie udało się pobrać danych filmu. Spróbuj ponownie później.');
      }
    };

    fetchMovieDetails(); // Uruchamiamy funkcję fetch
  }, [id]);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2">Ładowanie...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <p>{error}</p>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="my-4">
        <p>Nie znaleziono filmu.</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1>{movie.title}</h1>
      <Card>
        <Card.Img 
          variant="top" 
          src={movie.imgUrl || 'https://via.placeholder.com/150'} 
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'cover',
            maxHeight: '600px',
          }} 
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>

          <ListGroup variant="flush">
            <ListGroup.Item><strong>Rok wydania:</strong> {movie.release_year}</ListGroup.Item>
            
            <ListGroup.Item><strong>Gatunek:</strong> {genres.find(genre => genre._id === movie.genre)?.genre || 'Brak danych'}</ListGroup.Item>

            <ListGroup.Item><strong>Kraj pochodzenia:</strong> {countries.find(country => country._id === movie.countryOfOrigin)?.country || 'Brak danych'}</ListGroup.Item>

            <ListGroup.Item>
              <strong>Reżyser:</strong> {directors.find(director => director._id === movie.director)?.first_name + ' ' + directors.find(director => director._id === movie.director)?.last_name || 'Brak danych'}
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Aktorzy:</strong> 
              {movie.actors.length > 0 ? movie.actors.map(actorId => {
                const actor = actors.find(a => a._id === actorId);
                return  actor ? ' ' + actor.first_name + ' ' + actor.last_name : '';
              }).join(', ') : 'Brak danych'}
            </ListGroup.Item>
          </ListGroup>

          <Button variant="primary" href={movie.trailerLink} target="_blank" className="mt-3">
            Zobacz trailer
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetails;
