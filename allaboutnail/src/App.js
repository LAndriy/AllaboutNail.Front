import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery.js';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import VisitHistory from './pages/VisitHistory';

function App() {
    return (
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
                    <Route path="/account" element={<Account />} />
                    <Route path="/history" element={<VisitHistory />} />
                </Routes>
            </Container>
        </div>
    );
}


export default App;