import React, { useState, useContext, useEffect } from 'react';
import { Typography, Box, TextField, MenuItem, Button, Alert, CircularProgress, FormControl, InputLabel, Select, List, ListItem, ListItemText} from '@mui/material';
import Calendar from '../components/Calendar';
import '../Style/Booking.css';
import { ReservationsContext } from '../context/ReservationContext';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Booking() {
    const { addReservation, error, clearError, loading } = useContext(ReservationsContext);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [employees, setEmployees] = useState([]);
    const [services, setServices] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeesData, servicesData] = await Promise.all([
                    bookingService.getEmployees(),
                    bookingService.getServices()
                ]);
                setEmployees(employeesData);
                setServices(servicesData);
            } catch (err) {
                console.error('Błąd podczas pobierania danych:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/booking' } });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!selectedEmployee) return;
            
            setLoadingSlots(true);
            try {
                const slots = await bookingService.getAvailability(selectedEmployee, new Date());
                setAvailableSlots(slots);
            } catch (err) {
                console.error('Błąd podczas pobierania dostępności:', err);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchAvailability();
    }, [selectedEmployee]);

    const validateForm = () => {
        if (!selectedSlot) return 'Wybierz termin';
        if (!selectedEmployee) return 'Wybierz pracownika';
        if (!selectedService) return 'Wybierz usługę';
        if (!clientName.trim()) return 'Podaj imię';
        if (!clientPhone.trim()) return 'Podaj numer telefonu';
        if (!/^\d{9}$/.test(clientPhone.replace(/\s/g, ''))) return 'Nieprawidłowy numer telefonu';
        return null;
    };

    const handleBooking = async () => {
        const validationError = validateForm();
        if (validationError) {
            alert(validationError);
            return;
        }

        try {
            await addReservation({
                datetime: selectedSlot,
                employeeId: selectedEmployee,
                serviceId: selectedService,
                clientName,
                clientPhone: clientPhone.replace(/\s/g, ''),
            });
            
            setSelectedSlot(null);
            setSelectedService('');
            setClientName('');
            setClientPhone('');
            
            alert('Rezerwacja została utworzona pomyślnie!');
        } catch (err) {
            console.error('Błąd podczas tworzenia rezerwacji:', err);
        }
    };

    return (
        <Box>
            <Typography mt={4} variant="h4" sx={{ fontWeight: 'bold', color: '#555' }}>
                Rezerwacja wizyty
            </Typography>
            
            {error && (
                <Alert severity="error" onClose={clearError} sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            
            <Box mt={2} className='form-container'>
                <FormControl className='input' fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Wybierz pracownika</InputLabel>
                    <Select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        label="Wybierz pracownika"
                    >
                        {employees.map((employee) => (
                            <MenuItem key={employee.id} value={employee.id}>
                                {employee.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className='input' fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Wybierz usługę</InputLabel>
                    <Select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        label="Wybierz usługę"
                    >
                        {services.map((service) => (
                            <MenuItem key={service.id} value={service.id}>
                                {service.name} - {service.price} zł
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedEmployee && (
                    <Calendar
                        reservations={availableSlots}
                        onSlotSelect={setSelectedSlot}
                        selectedSlot={selectedSlot}
                    />
                )}

                {selectedSlot && (
                    <>
                        <TextField
                            className='input'
                            fullWidth
                            label="Imię i nazwisko"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            className='input'
                            fullWidth
                            label="Numer telefonu"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleBooking}
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Zarezerwuj'}
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Booking;
