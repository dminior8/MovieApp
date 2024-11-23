import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { AuthAPI } from '../../../api/AuthAPI';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAPI.register(formData);
            setMessage(response.message);
            setError(null);
            setFormData({ username: '', email: '', password: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'Błąd rejestracji');
            setMessage(null);
        }
    };

    return (
        <Container
            style={{ maxWidth: '500px', marginTop: '50px' }}
            className="bg-dark text-light p-4 rounded shadow-lg"
        >
            <h2 className="text-center mb-4">Rejestracja</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col xs={12}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Nazwa użytkownika</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Wprowadź nazwę użytkownika"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="bg-dark text-light border-light rounded"
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Adres e-mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Wprowadź adres e-mail"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-dark text-light border-light rounded"
                            />
                        </Form.Group>
                    </Col>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Wprowadź hasło"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-dark text-light border-light rounded"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Zarejestruj się
                    </Button>
                </Row>
            </Form>
        </Container>
    );
};

export default RegisterForm;
