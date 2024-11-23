import apiClient from './ApiClient'; // Importujemy klienta API

export const MoviesAPI = {
  // Pobierz wszystkie filmy
  getAllMovies: () => {
    return apiClient.get("/movies").then((response) => response.data); // Pobieranie wszystkich filmów
  },

  // Pobierz film po ID
  getMovieById: (id) => {
    return apiClient.get(`/movies/${id}`).then((response) => response.data); // Pobieranie filmu na podstawie ID
  },

  // Filtruj filmy według kryteriów (np. rok, gatunek, itd.)
  filterMovies: (filters) => {
    return apiClient.get("/movies/filter", { params: filters }).then((response) => response.data); // Wysyłanie filtrów do backendu
  },

  // Pobierz wszystkie dostępne gatunki filmów
  getGenres: () => {
    return apiClient.get("/genres")
      .then(response => response.data)  // Zwraca dane o gatunkach
      .catch(error => {
        console.error('Błąd przy pobieraniu gatunków:', error);
        throw error;  // Rzucamy błąd, aby obsłużyć go w komponencie
      });
  },

  // Pobierz wszystkich aktorów
  getActors: () => {
    return apiClient.get("/actors")
      .then(response => response.data)  // Zwraca dane o aktorach
      .catch(error => {
        console.error('Błąd przy pobieraniu aktorów:', error);
        throw error;  // Rzucamy błąd, aby obsłużyć go w komponencie
      });
  },

  // Pobierz wszystkich reżyserów
  getDirectors: () => {
    return apiClient.get("/directors")
      .then(response => response.data)  // Zwraca dane o reżyserach
      .catch(error => {
        console.error('Błąd przy pobieraniu reżyserów:', error);
        throw error;  // Rzucamy błąd, aby obsłużyć go w komponencie
      });
  },

  // Pobierz wszystkie dostępne kraje
  getCountries: () => {
    return apiClient.get("/countries")
      .then(response => response.data)  // Zwraca dane o krajach
      .catch(error => {
        console.error('Błąd przy pobieraniu krajów:', error);
        throw error;  // Rzucamy błąd, aby obsłużyć go w komponencie
      });
  },
};


