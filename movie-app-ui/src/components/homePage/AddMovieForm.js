import React, { useState, useEffect } from 'react';
import { MoviesAPI } from '../../api/MoviesAPI'; // Importujemy API
import { Modal, Form, Button } from 'react-bootstrap';

const AddMovieForm = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        release_year: '',
        genre: '',
        countryOfOrigin: '',
        director: { first_name: '', last_name: '' },
        actors: [{ first_name: '', last_name: '' }],
        imgUrl: '',
        description: ''
    });
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresData = await MoviesAPI.getGenres();
                setGenres(genresData);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchCountries = async () => {
            try {
                const countriesData = await MoviesAPI.getCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchGenres();
        fetchCountries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDirectorChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, director: { ...formData.director, [name]: value } });
    };

    const handleActorChange = (index, e) => {
        const { name, value } = e.target;
        const updatedActors = [...formData.actors];
        updatedActors[index][name] = value;
        setFormData({ ...formData, actors: updatedActors });
    };

    const addActor = () => {
        setFormData({ ...formData, actors: [...formData.actors, { first_name: '', last_name: '' }] });
    };

    const removeActor = (index) => {
        const updatedActors = formData.actors.filter((_, i) => i !== index);
        setFormData({ ...formData, actors: updatedActors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.release_year || !formData.genre || !formData.countryOfOrigin || !formData.director.first_name || !formData.director.last_name || !formData.imgUrl || !formData.description) {
            alert("Wypełnij wszystkie pola!");
            return;
        }

        try {
            // Dodaj reżysera
            const directorData = await MoviesAPI.addDirector(formData.director);

            // Dodaj aktorów
            const actorPromises = formData.actors.map(actor => MoviesAPI.addActor(actor));
            const actorsData = await Promise.all(actorPromises);

            // Dodaj film
            const movieData = {
                title: formData.title,
                release_year: parseInt(formData.release_year, 10),
                genre: formData.genre,
                countryOfOrigin: formData.countryOfOrigin,
                director: `${directorData.first_name} ${directorData.last_name}`,
                actors: actorsData.map(actor => `${actor.first_name} ${actor.last_name}`),
                imgUrl: formData.imgUrl,
                description: formData.description
            };

            const newMovie = await MoviesAPI.addMovie(movieData);
            onAdd(newMovie);
            onClose();

        } catch (error) {
            console.error('Błąd:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj nowy film</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Formularz */}
                    <Form.Group controlId="title">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="release_year">
                        <Form.Label>Rok wydania</Form.Label>
                        <Form.Control type="number" name="release_year" value={formData.release_year} onChange={handleChange} min="1900" max={currentYear} />
                    </Form.Group>
                    <Form.Group controlId="genre">
                        <Form.Label>Gatunek</Form.Label>
                        <Form.Control as="select" name="genre" value={formData.genre} onChange={handleChange}>
                            <option value="">Wybierz gatunek</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre.genre}>{genre.genre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countryOfOrigin">
                        <Form.Label>Kraj pochodzenia</Form.Label>
                        <Form.Control as="select" name="countryOfOrigin" value={formData.countryOfOrigin} onChange={handleChange}>
                            <option value="">Wybierz kraj</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.country}>{country.country}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="director">
                        <Form.Label>Reżyser</Form.Label>
                        <Form.Control type="text" name="first_name" placeholder="Imię" value={formData.director.first_name} onChange={handleDirectorChange} />
                        <Form.Control type="text" name="last_name" placeholder="Nazwisko" value={formData.director.last_name} onChange={handleDirectorChange} />
                    </Form.Group>
                    <Form.Group controlId="actors">
                        <Form.Label>Aktorzy</Form.Label>
                        {formData.actors.map((actor, index) => (
                            <div key={index} className="actor-fields">
                                <Form.Control type="text" name="first_name" placeholder="Imię" value={actor.first_name} onChange={(e) => handleActorChange(index, e)} />
                                <Form.Control type="text" name="last_name" placeholder="Nazwisko" value={actor.last_name} onChange={(e) => handleActorChange(index, e)} />
                                <Button variant="danger" onClick={() => removeActor(index)}>Usuń</Button>
                            </div>
                        ))}
                        <Button variant="primary" onClick={addActor}>Dodaj aktora</Button>
                    </Form.Group>
                    <Form.Group controlId="imgUrl">
                        <Form.Label>URL plakatu</Form.Label>
                        <Form.Control type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3} value={formData.description} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="success" type="submit">Dodaj film</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddMovieForm;
