import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    Select,
    MenuItem,
    Button,
    Alert
} from '@mui/material';
import { authService } from '../services/authService';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await authService.getUsers();
            setUsers(response);
            setLoading(false);
        } catch (err) {
            setError('Nie udało się pobrać listy użytkowników');
            setLoading(false);
        }
    };

    const handleRoleChange = async (email, newRole) => {
        try {
            await authService.assignRole({ email, role: newRole });
            setSuccessMessage('Rola została zaktualizowana pomyślnie');
            fetchUsers();
        } catch (err) {
            setError('Nie udało się zaktualizować roli użytkownika');
        }
    };

    if (loading) return <Typography>Ładowanie...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Panel Administracyjny
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa użytkownika</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Obecna rola</TableCell>
                            <TableCell>Zmień rolę</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.roles.join(', ')}</TableCell>
                                <TableCell>
                                    <FormControl size="small">
                                        <Select
                                            value=""
                                            onChange={(e) => handleRoleChange(user.email, e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Wybierz rolę
                                            </MenuItem>
                                            <MenuItem value="Admin">Administrator</MenuItem>
                                            <MenuItem value="Employee">Pracownik</MenuItem>
                                            <MenuItem value="Client">Klient</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminPanel;
