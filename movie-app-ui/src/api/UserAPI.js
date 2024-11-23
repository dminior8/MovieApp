import apiClient from './ApiClient';

export const UserAPI = {
  // Dodawanie filmu do ulubionych
  addFavorite: (userId, movieId) => {
    return apiClient.post(`/users/${userId}/favorites/${movieId}`,)
      .then((response) => response.data);
  },
  // Usuwanie filmu z ulubionych
  removeFavorite: (userId, movieId) => {
    return apiClient.delete(`users/${userId}/favorites/${movieId}`)
      .then((response) => response.data);
  },
  // Pobieranie ulubionych filmów
  getFavorites: (userId) => {
    return apiClient.get(`users/${userId}/favorites`)
      .then((response) => response.data);
  },
};
