import React from 'react';
import { Typography, Box, Button } from '@mui/material';

function Account() {
    // Tymczasowe dane użytkownika
    const user = {
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@example.com',
    };

    return (
        <Box>
            <Typography  mt={4} variant="h4" sx={{ fontWeight: 'bold', color: '#555' }}>Moje konto</Typography>
            <Box mt={2}>
                <Typography><strong>Imię:</strong> {user.firstName}</Typography>
                <Typography><strong>Nazwisko:</strong> {user.lastName}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
            </Box>

            <Button
            variant="contained"
            color="error">
                Wyloguj się
            </Button>
        </Box>
    );
}

export default Account;
