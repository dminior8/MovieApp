import apiClient from './ApiClient'

export const AuthAPI = {
  register: (userData) => {
    return apiClient.post("/auth/register", userData).then((response) => response.data);
  },
  login: (credentials) => {
    return apiClient.post("/auth/login", credentials).then((response) => response.data);
  },
  logout: () => {
    return apiClient.post('/auth/logout').then((response) => response.data);
  },
};
