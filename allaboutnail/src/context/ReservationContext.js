import React, { createContext, useState, useCallback } from 'react';
import { bookingService } from '../services/bookingService';

export const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addReservation = useCallback(async (reservationData) => {
        try {
            setPendingReservations(prev => [...prev, reservationData]);
            
            const savedReservation = await bookingService.createReservation(reservationData);
            
            setReservations(prev => [...prev, savedReservation]);
            
            setPendingReservations(prev => 
                prev.filter(r => r !== reservationData)
            );

            return savedReservation;
        } catch (err) {
            setError('Nie udało się utworzyć rezerwacji. Spróbuj ponownie.');
            setPendingReservations(prev => 
                prev.filter(r => r !== reservationData)
            );
            throw err;
        }
    }, []);

    const fetchEmployeeReservations = useCallback(async (employeeId) => {
        try {
            setLoading(true);
            const fetchedReservations = await bookingService.getEmployeeReservations(employeeId);
            setReservations(fetchedReservations);
        } catch (err) {
            setError('Nie udało się pobrać rezerwacji.');
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = () => setError(null);

    return (
        <ReservationsContext.Provider 
            value={{ 
                reservations,
                pendingReservations,
                loading,
                error,
                addReservation,
                fetchEmployeeReservations,
                clearError
            }}
        >
            {children}
        </ReservationsContext.Provider>
    );
};
