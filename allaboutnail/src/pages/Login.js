import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Wypełnij wszystkie pola');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Podaj prawidłowy adres email');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.login(formData);
            await login(response.user, response.token);
            const from = location.state?.from || '/';
            navigate(from);
        } catch (err) {
            setError(err.response?.data?.message || 'Nieprawidłowy email lub hasło');
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            //integracja z Google OAuth
        } catch (err) {
            setError('Wystąpił błąd podczas logowania przez Google');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Logowanie
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
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
                        type={showPassword ? 'text' : 'password'}
                        label="Hasło"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        margin="normal"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ textAlign: 'right', mb: 2 }}>
                        <Link to="/reset-password" style={{ textDecoration: 'none' }}>
                            <Typography color="primary" variant="body2">
                                Zapomniałeś hasła?
                            </Typography>
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logowanie...' : 'Zaloguj się'}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>lub</Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    sx={{ mb: 2 }}
                >
                    Kontynuuj z Google
                </Button>

                <Typography align="center" color="textSecondary">
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default Login;
