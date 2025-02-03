import api from './api';
import { API_ENDPOINTS } from '../config/api.config';

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    register: async (userData) => {
        try {
            const response = await api.post(API_ENDPOINTS.REGISTER, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response?.data);
            if (error.response?.data?.message) {
                throw { message: error.response.data.message };
            } else if (error.response?.data) {
                throw { message: Object.values(error.response.data).join(', ') };
            }
            throw { message: 'Wystąpił błąd podczas rejestracji' };
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Nieprawidłowy email lub hasło' };
        }
    },

    logout: async () => {
        try {
            await api.post(API_ENDPOINTS.LOGOUT);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Błąd podczas wylogowywania:', error);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.CURRENT_USER);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUsers: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.USERS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    assignRole: async (data) => {
        try {
            const response = await api.post(API_ENDPOINTS.ASSIGN_ROLE, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;
