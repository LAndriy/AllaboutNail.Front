import React from 'react';
import { Typography, Box } from '@mui/material';

function Account() {
    // Tymczasowe dane użytkownika
    const user = {
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@example.com',
    };

    return (
        <Box>
            <Typography variant="h4">Moje konto</Typography>
            <Box mt={2}>
                <Typography><strong>Imię:</strong> {user.firstName}</Typography>
                <Typography><strong>Nazwisko:</strong> {user.lastName}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
            </Box>
        </Box>
    );
}

export default Account;
