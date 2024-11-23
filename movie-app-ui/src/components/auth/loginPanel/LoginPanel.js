import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { AuthAPI } from '../../../api/AuthAPI';

const LoginPanel = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.login({ email, password });
      if (response.token) {
        Cookies.set('authToken', response.token);
        setIsLoggedIn(true);
        setError(null); // Clear previous errors
      } else {
        setError('Nieprawidłowy login lub hasło');
      }
    } catch (err) {
      console.error('Błąd logowania:', err);
      if (err.response) {
        setError(`Błąd serwera: ${err.response.data.error || 'Spróbuj ponownie później'}`);
      } else {
        setError('Wystąpił błąd, spróbuj ponownie później');
      }
    }
  };
  

  return (
    <Container
      style={{ maxWidth: '500px', marginTop: '50px' }}
      className="bg-dark text-light p-4 rounded shadow-lg"
    >
      <h2 className="text-center mb-4">Zaloguj się</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Row className="mb-3">
          <Col xs={12}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Wprowadź email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-dark text-light border-light rounded"
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Wprowadź hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark text-light border-light rounded"
              />
            </Form.Group>
          </Col>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Zaloguj się
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginPanel;
