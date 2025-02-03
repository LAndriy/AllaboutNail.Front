import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function Account() {
    const navigate = useNavigate();
    const { user, logout, updateUserData, deleteAccount } = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [visits, setVisits] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchVisits = async () => {
            try {
                const data = await authService.getVisitHistory();
                setVisits(data);
            } catch (err) {
                setError('Nie udało się pobrać historii wizyt');
            }
        };

        fetchVisits();
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await authService.updateUser(formData);
            updateUserData(updatedUser);
            setSuccess('Dane zostały zaktualizowane');
        } catch (err) {
            setError(err.response?.data?.message || 'Wystąpił błąd podczas aktualizacji danych');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Nowe hasła nie są identyczne');
            return;
        }

        if (!PASSWORD_REGEX.test(passwordData.newPassword)) {
            setError('Nowe hasło musi zawierać minimum 8 znaków, jedną wielką literę, jedną małą literę i jedną cyfrę');
            return;
        }

        setLoading(true);
        try {
            await authService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setSuccess('Hasło zostało zmienione');
            setShowPasswordDialog(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Wystąpił błąd podczas zmiany hasła');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            setShowDeleteDialog(false);
            navigate('/');
        } catch (err) {
            setError('Nie udało się usunąć konta');
            setShowDeleteDialog(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Moje konto
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                        {success}
                    </Alert>
                )}

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Dane osobowe
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Nazwa użytkownika"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            margin="normal"
                            disabled
                        />
                        
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            margin="normal"
                            disabled
                        />
                        
                        <TextField
                            fullWidth
                            label="Numer telefonu"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            margin="normal"
                            placeholder="123456789"
                        />
                        
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Aktualizacja...' : 'Aktualizuj dane'}
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => setShowPasswordDialog(true)}
                            >
                                Zmień hasło
                            </Button>
                        </Box>
                    </form>
                </Paper>

                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Historia wizyt
                    </Typography>
                    {visits.length > 0 ? (
                        <List>
                            {visits.map((visit, index) => (
                                <React.Fragment key={visit.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={format(new Date(visit.datetime), 'PPp', { locale: pl })}
                                            secondary={`${visit.service} - ${visit.employeeName}`}
                                        />
                                    </ListItem>
                                    {index < visits.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    ) : (
                        <Typography color="textSecondary">
                            Brak historii wizyt
                        </Typography>
                    )}
                </Paper>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={logout}
                    >
                        Wyloguj się
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        Usuń konto
                    </Button>
                </Box>

                {/* Dialog zmiany hasła */}
                <Dialog
                    open={showPasswordDialog}
                    onClose={() => setShowPasswordDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Zmiana hasła
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handlePasswordChange}>
                            <TextField
                                fullWidth
                                type={showPasswords.current ? 'text' : 'password'}
                                label="Aktualne hasło"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                                edge="end"
                                            >
                                                {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                type={showPasswords.new ? 'text' : 'password'}
                                label="Nowe hasło"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                                edge="end"
                                            >
                                                {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                type={showPasswords.confirm ? 'text' : 'password'}
                                label="Potwierdź nowe hasło"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                margin="normal"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                                edge="end"
                                            >
                                                {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowPasswordDialog(false)}>
                            Anuluj
                        </Button>
                        <Button onClick={handlePasswordChange} variant="contained" disabled={loading}>
                            {loading ? 'Zmiana hasła...' : 'Zmień hasło'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={showDeleteDialog}
                    onClose={() => setShowDeleteDialog(false)}
                >
                    <DialogTitle>
                        Czy na pewno chcesz usunąć konto?
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Ta operacja jest nieodwracalna. Wszystkie Twoje dane zostaną usunięte.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDeleteDialog(false)}>
                            Anuluj
                        </Button>
                        <Button onClick={handleDeleteAccount} color="error">
                            Usuń konto
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Account;
