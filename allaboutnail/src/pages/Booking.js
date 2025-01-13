import React, { useState } from 'react';
import { Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import Calendar from '../components/Calendar';
import '../Style/Booking.css';

function Booking() {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const employees = [
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Ewa' },
    ];

    const reservations = [
        { datetime: '2025-01-06 09:30' },
        { datetime: '2025-01-08 14:00' },
    ];

    const handleBooking = () => {
        if (selectedSlot && selectedEmployee && clientName && clientPhone) {
            alert(`Zarezerwowano wizytę u ${selectedEmployee} dnia ${selectedSlot}. Klient: ${clientName}, Telefon: ${clientPhone}`);
        } else {
            alert('Proszę wypełnić wszystkie pola.');
        }
    };

    return (
        <Box>
            <Typography mt={4} variant="h4" sx={{ fontWeight: 'bold', color: '#555' }}>Rezerwacja wizyty</Typography>
            <Box mt={2} className='form-container'>

                <Calendar
                    reservations={reservations}
                    onSlotSelect={(datetime) => setSelectedSlot(datetime)}
                />

                <TextField
                    className='input'
                    select
                    label="Wybierz pracownika"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.name}>
                            {employee.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    className='input'
                    label="Imię i nazwisko"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                <TextField
                    className='input'
                    label="Numer telefonu"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    type="tel"
                />

                <Button
                    className='buton'
                    variant="contained"
                    onClick={handleBooking}
                >
                    Zarezerwuj
                </Button>
            </Box>
        </Box>
    );
}

export default Booking;
