import api from './api';
import { API_ENDPOINTS } from '../config/api.config';

const bookingService = {
    getReservations: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.GET_RESERVATIONS);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createReservation: async (reservationData) => {
        try {
            const response = await api.post(API_ENDPOINTS.CREATE_RESERVATION, reservationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateReservation: async (id, reservationData) => {
        try {
            const response = await api.put(API_ENDPOINTS.UPDATE_RESERVATION(id), reservationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteReservation: async (id) => {
        try {
            const response = await api.delete(API_ENDPOINTS.DELETE_RESERVATION(id));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getEmployeeSchedule: async (employeeId) => {
        try {
            const response = await api.get(API_ENDPOINTS.GET_EMPLOYEE_SCHEDULE(employeeId));
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getEmployees: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.GET_EMPLOYEES);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAvailability: async (employeeId, date) => {
        try {
            console.log('Wysyłanie zapytania o dostępność:', { employeeId, date }); // Dodaj ten log
            const response = await api.get(API_ENDPOINTS.GET_AVAILABILITY, {
                params: {
                    employeeId: parseInt(employeeId), // Upewnij się, że ID jest liczbą
                    date: date.toISOString()
                }
            });
            console.log('Otrzymane sloty:', response.data); // Dodaj ten log
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania dostępności:', error);
            throw error.response?.data || error.message;
        }
    },

    getServices: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.GET_SERVICES);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export { bookingService };
