import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const lastActivity = localStorage.getItem('lastActivity');
        
        if (token) {
            authService.getCurrentUser()
                .then(userData => {
                    setUser(userData);
                    updateLastActivity();
                })
                .catch((err) => {
                    setError('Sesja wygasła. Zaloguj się ponownie.');
                    handleLogout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const updateActivity = () => updateLastActivity();
        
        window.addEventListener('mousemove', updateActivity);
        window.addEventListener('keydown', updateActivity);
        window.addEventListener('click', updateActivity);

        return () => {
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
            window.removeEventListener('click', updateActivity);
        };
    }, [user]);

    const updateLastActivity = () => {
        localStorage.setItem('lastActivity', Date.now().toString());
    };

    const handleLogin = async (userData, token) => {
        try {
            localStorage.setItem('token', token);
            updateLastActivity();
            setUser(userData);
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('lastActivity');
        setUser(null);
        setError(null);
    };

    const updateUserData = (newUserData) => {
        try {
            setUser(newUserData);
            updateLastActivity();
        } catch (error) {
            setError('Błąd podczas aktualizacji danych użytkownika.');
            throw error;
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await authService.deleteAccount();
            handleLogout();
        } catch (error) {
            setError('Błąd podczas usuwania konta. Spróbuj ponownie.');
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
        updateUserData,
        deleteAccount: handleDeleteAccount
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
