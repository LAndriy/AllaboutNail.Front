import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery.js';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from './pages/Account';
import VisitHistory from './pages/VisitHistory';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <CssBaseline />
                <Navbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/history" element={<VisitHistory />} />
                        <Route path="/admin" element={
                            <PrivateRoute roles={['Admin']}>
                                <AdminPanel />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;