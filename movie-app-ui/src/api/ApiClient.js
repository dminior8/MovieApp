import axios from 'axios';
import Cookies from 'js-cookie' // Importujemy bibliotekę js-cookie

// Konfiguracja instancji axios
const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ważne, aby ciasteczka były dołączane do żądań
});

// Ustawienie nagłówka Authorization z ciasteczek
apiClient.interceptors.request.use((config) => {

    const token = Cookies.get('authToken'); // Odczytujemy token z ciasteczek

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; 
    }

    return config;
});

export default apiClient;
