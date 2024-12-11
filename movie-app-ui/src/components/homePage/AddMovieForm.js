import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AddMovieForm = ({ show, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        releaseYear: '',
        genre: '',
        countryOfOrigin: '',
        directorFirstName: '',
        directorLastName: '',
        actors: [{ firstName: '', lastName: '' }], // Początkowo pusta lista aktorów
        imgUrl: '',
        description: ''
    });

    const currentYear = new Date().getFullYear();

    const genres = [
        "Biography", "Drama", "Comedy", "Horror",
        "Action", "Adventure", "Fantasy",
        "Sci-Fi", "Romance", "Documentary"
    ];

    const countries = [
        "USA", "UK", "France", "Germany", "Canada", "Australia", "India", "Spain", "Italy", "Japan", "Russia",
        "China", "South Korea", "Brazil", "Mexico", "Sweden", "Netherlands", "Poland", "Argentina", "South Africa"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleActorChange = (index, e) => {
        const { name, value } = e.target;
        const updatedActors = [...formData.actors];
        updatedActors[index][name] = value;
        setFormData({ ...formData, actors: updatedActors });
    };

    const addActor = () => {
        setFormData({ ...formData, actors: [...formData.actors, { firstName: '', lastName: '' }] });
    };

    const removeActor = (index) => {
        const updatedActors = formData.actors.filter((_, i) => i !== index);
        setFormData({ ...formData, actors: updatedActors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Walidacja formularza
        if (!formData.title || !formData.releaseYear || !formData.genre || !formData.countryOfOrigin || !formData.directorFirstName || !formData.directorLastName || !formData.imgUrl || !formData.description) {
            alert("Wypełnij wszystkie pola!");
            return;
        }
        if (
            isNaN(formData.releaseYear) ||
            isNaN(formData.releaseYear) ||
            formData.releaseYear < 1900 ||
            formData.releaseYear > currentYear
        ) {
            alert(`Rok wydania musi być liczbą z zakresu od 1900 do ${currentYear}!`);
            return;
        }

        // Przygotowanie danych do wysłania
        const movieData = {
            title: formData.title,
            release_year: parseInt(formData.releaseYear, 10),
            genre: formData.genre,
            countryOfOrigin: formData.countryOfOrigin,
            director: `${formData.directorFirstName} ${formData.directorLastName}`,
            actors: formData.actors.map(actor => ({
                first_name: actor.firstName,
                last_name: actor.lastName
            })),
            imgUrl: formData.imgUrl,
            description: formData.description
        };

        // Wysłanie danych do backendu
        try {
            const response = await fetch('/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData), // Przesyłamy dane filmu w formacie JSON
            });

            if (response.ok) {
                const newMovie = await response.json(); // Odbieramy odpowiedź z serwera
                onAdd(newMovie); // Wywołanie funkcji callback, aby dodać film do stanu w aplikacji
                onClose(); // Zamknij modal po dodaniu filmu
            } else {
                const error = await response.json();
                alert(`Błąd: ${error.message}`);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania danych:', error);
            alert('Błąd podczas dodawania filmu');
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj nowy film</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="releaseYear">
                        <Form.Label>Rok wydania</Form.Label>
                        <Form.Control
                            type="number"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            min="1900"
                            max={currentYear}
                        />
                    </Form.Group>
                    <Form.Group controlId="genre">
                        <Form.Label>Gatunek</Form.Label>
                        <Form.Control
                            as="select"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                        >
                            <option value="">Wybierz gatunek</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countryOfOrigin">
                        <Form.Label>Kraj produkcji</Form.Label>
                        <Form.Control
                            as="select"
                            name="countryOfOrigin"
                            value={formData.countryOfOrigin}
                            onChange={handleChange}
                        >
                            <option value="">Wybierz kraj</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="directorFirstName">
                        <Form.Label>Imię reżysera</Form.Label>
                        <Form.Control
                            type="text"
                            name="directorFirstName"
                            value={formData.directorFirstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="directorLastName">
                        <Form.Label>Nazwisko reżysera</Form.Label>
                        <Form.Control
                            type="text"
                            name="directorLastName"
                            value={formData.directorLastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Label>Aktorzy</Form.Label>
                    {formData.actors.map((actor, index) => (
                        <div key={index}>
                            <Form.Group controlId={`actorFirstName_${index}`}>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="Imię aktora"
                                    value={actor.firstName}
                                    onChange={(e) => handleActorChange(index, e)}
                                />
                            </Form.Group>
                            <Form.Group controlId={`actorLastName_${index}`}>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Nazwisko aktora"
                                    value={actor.lastName}
                                    onChange={(e) => handleActorChange(index, e)}
                                />
                            </Form.Group>
                            <Button variant="danger" onClick={() => removeActor(index)}>Usuń aktora</Button>
                        </div>
                    ))}
                    <Button variant="primary" onClick={addActor}>Dodaj aktora</Button>
                    <Form.Group controlId="imgUrl">
                        <Form.Label>URL obrazu</Form.Label>
                        <Form.Control
                            type="text"
                            name="imgUrl"
                            value={formData.imgUrl}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength="255"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Dodaj film
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddMovieForm;
