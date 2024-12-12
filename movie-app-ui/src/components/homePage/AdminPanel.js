import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Toast } from 'react-bootstrap';
import { MoviesAPI } from '../../api/MoviesAPI'; // Import API filmów
import { FaRegTrashAlt } from 'react-icons/fa'; // Ikona kosza
import AddMovieForm from './AddMovieForm'; // Import formularza

const AdminPanel = () => {
    const [movies, setMovies] = useState([]); // Lista filmów
    const [users, setUsers] = useState([]); // Lista użytkowników
    const [loading, setLoading] = useState(false); // Wskaźnik ładowania
    const [error, setError] = useState(null); // Obsługa błędów
    const [showAddMovieModal, setShowAddMovieModal] = useState(false); // Stan widoczności modala

    useEffect(() => {
        // Pobieranie filmów
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const moviesData = await MoviesAPI.getAllMovies(); // Pobranie filmów z API
                setMovies(moviesData);
            } catch (err) {
                console.error("Błąd przy pobieraniu filmów:", err);
                setError("Nie udało się pobrać listy filmów.");
            } finally {
                setLoading(false);
            }
        };

        // Symulowane pobieranie użytkowników
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersData = await MoviesAPI.getAllUsers(); // Pobranie filmów z API
                setUsers(usersData);
            } catch (err) {
                console.error("Błąd przy pobieraniu użytkowników:", err);
                setError("Nie udało się pobrać listy użytkowników.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        fetchUsers();
    }, []);

    const handleAddMovie = (newMovie) => {
        setMovies((prevMovies) => [...prevMovies, newMovie]); // Dodaj nowy film do listy
    };

    // Funkcja do usuwania filmu
    const handleDeleteMovie = async (id) => {
        try {
            await MoviesAPI.deleteMovie(id); // Usuwanie filmu z API
            setMovies((prevMovies) => prevMovies.filter(movie => movie._id !== id)); // Usuwanie filmu z listy
        } catch (err) {
            console.error("Błąd przy usuwaniu filmu:", err);
            setError("Nie udało się usunąć filmu.");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await MoviesAPI.deleteUser(id); // Usuwanie użytkownika z API
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== id)); // Usuwanie użytkownika z listy
        } catch (err) {
            console.error("Błąd przy usuwaniu filmu:", err);
            setError("Nie udało się usunąć filmu.");
        }
    };

    return (
        <Container className="my-4">
            <h1 className="text-center mb-4 gradient-title text-light">Admin Panel</h1>
            {error && <Toast>{error}</Toast>}
            <Row>
                <Col md={6}>
                    <h2>Lista użytkowników</h2>
                    <ListGroup>
                        {users.map((user) => (
                            <ListGroup.Item key={user._id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    {user.username}{" "}
                                    <span style={{ fontWeight: 'bold' }}>
                                            ({user.email})
                                        </span>
                                </div>
                                <FaRegTrashAlt
                                    size={20}
                                    color="red"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeleteUser(user._id)} // Wywołanie funkcji usuwania użytkownika
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={6}>
                    <h2>Lista filmów</h2>
                    {loading ? (
                        <p>Ładowanie...</p>
                    ) : (
                        <ListGroup>
                            {movies.map((movie) => (
                                <ListGroup.Item key={movie._id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        {movie.title}{" "}
                                        <span style={{ fontWeight: 'bold' }}>
                                            ({movie.release_year})
                                        </span>
                                    </div>
                                    <FaRegTrashAlt
                                        size={20}
                                        color="red"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteMovie(movie._id)} // Wywołanie funkcji usuwania filmu
                                    />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    <div className="mt-3">
                        <Button variant="primary" onClick={() => setShowAddMovieModal(true)}>
                            Dodaj film
                        </Button>
                    </div>
                </Col>
            </Row>
            {/* Modal do dodawania filmu */}
            <AddMovieForm
                show={showAddMovieModal}
                onClose={() => setShowAddMovieModal(false)}
                onAdd={handleAddMovie}
            />
        </Container>
    );
};

export default AdminPanel;
