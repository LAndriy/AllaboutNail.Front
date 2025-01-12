import React, { useState } from 'react';
import { Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import Calendar from '../components/Calendar';


function Booking() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const employees = [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Ewa' },
    ];

    const reservations = [
        { datetime: '2025-01-06 09:30' },
        { datetime: '2025-01-08 14:00' },
    ];

    const handleBooking = () => {
        if (selectedSlot && selectedEmployee) {
            alert(`Zarezerwowano wizytę u ${selectedEmployee} dnia ${selectedSlot}`);
        } else {
            alert('Proszę wypełnić wszystkie pola.');
        }
    };

    return (
        <Box>
            <Typography variant="h4">Rezerwacja wizyty</Typography>
            <Box mt={2}>
                <TextField
                    select
                    label="Wybierz pracownika"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.name}>
                            {employee.name}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Wstawiamy kalendarz */}
                <Calendar
                    reservations={reservations}
                    onSlotSelect={(datetime) => setSelectedSlot(datetime)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBooking}
                    sx={{ mt: 2 }}
                >
                    Zarezerwuj
                </Button>

                <TextField>
                    label="Podaj imię"
                    margin="normal"
                </TextField>
            </Box>
        </Box>
    );
}

export default Booking;
