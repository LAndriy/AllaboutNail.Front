import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Divider,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import '../Style/Auth.css';

// Hasło musi zawierać:
// - minimum 8 znaków
// - przynajmniej jedną wielką literę
// - przynajmniej jedną małą literę
// - przynajmniej jedną cyfrę
// - przynajmniej jeden znak specjalny
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirm: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Wypełnij wszystkie wymagane pola');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        if (!PASSWORD_REGEX.test(formData.password)) {
            setError('Hasło musi zawierać minimum 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę i jeden znak specjalny');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Podaj prawidłowy adres email');
            return;
        }

        if (formData.phoneNumber && !/^\d{9}$/.test(formData.phoneNumber)) {
            setError('Numer telefonu powinien składać się z 9 cyfr');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phoneNumber: formData.phoneNumber || null
            });
            await login(response.user, response.token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Wystąpił błąd podczas rejestracji');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            //integracja z Google OAuth
        } catch (err) {
            setError('Wystąpił błąd podczas rejestracji przez Google');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Rejestracja
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nazwa użytkownika"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        type={showPasswords.password ? 'text' : 'password'}
                        label="Hasło"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswords({ ...showPasswords, password: !showPasswords.password })}
                                        edge="end"
                                    >
                                        {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        type={showPasswords.confirm ? 'text' : 'password'}
                        label="Potwierdź hasło"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

                    <TextField
                        fullWidth
                        label="Numer telefonu (opcjonalnie)"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        margin="normal"
                        placeholder="123456789"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Rejestracja...' : 'Zarejestruj się'}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>lub</Divider>

                <Button
                className='auth-form button'
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleRegister}
                    sx={{ mb: 2 }}
                >
                    Kontynuuj z Google
                </Button>

                <Typography align="center" color="textSecondary">
                    Masz już konto? <Link to="/login">Zaloguj się</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Register;
