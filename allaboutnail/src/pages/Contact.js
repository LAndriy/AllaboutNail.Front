import React from 'react';
import { Typography, Link } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "../Style/Contact.css";

const center = {
    lat: 50.04200593684404,
    lng: 21.998741324785357,
};

const Contact = () => {
    return (
        <div id="kontakt">
            <Typography variant="h4" className="contact-title">
                Kontakt
            </Typography>
            <Typography variant="body1" className="contact-info">
                Masz pytania? Skontaktuj się z nami!
            </Typography>
            <div>
                <Typography variant="body1" className="contact-info">
                    Telefon:{' '}
                    <Link href="tel:+48123456789" className="contact-link">
                        +48 123 456 789
                    </Link>
                </Typography>
                <Typography variant="body1" className="contact-info">
                    Email:{' '}
                    <Link href="mailto:kontakt@allaboutnail.pl" className="contact-link">
                        kontakt@allaboutnail.pl
                    </Link>
                </Typography>
            </div>
            <div className="contact-links">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-button facebook-icon"
                >
                    <FacebookIcon fontSize="large" />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-button instagram-icon"
                >
                    <InstagramIcon fontSize="large" />
                </a>
            </div>
            <Typography variant="h6" className="map-title">
                Tu nas znajdziesz:
            </Typography>
            <div className="map-container">
                <LoadScript googleMapsApiKey="AIzaSyAfPR19sg0qNMCRNaNG86pBySD9Dn91__E">
                    <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
                        <Marker position={center} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Contact;
