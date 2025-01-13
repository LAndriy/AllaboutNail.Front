import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

function Gallery() {
    const images = [
        { src: '/images/nails1.png', description: 'Paznokcie hybrydowe w odcieniach pastelowych' },
        { src: '/images/nails2.png', description: 'Paznokcie z efektem marmuru' },
        { src: '/images/nails3.png', description: 'Klasyczne czerwone paznokcie żelowe' },
        { src: '/images/nails4.png', description: 'Paznokcie z minimalistycznym zdobieniem' },
        { src: '/images/nails5.png', description: 'French manicure na krótkich paznokciach' },
        { src: '/images/nails6.png', description: 'Paznokcie z efektem chrome' },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom
            sx={{ fontWeight: 'bold', color: '#555' }}
            >
                Galeria prac
            </Typography>
            <Grid container spacing={4}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={image.src}
                                alt={image.description}
                                sx={{
                                    width: '80%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ mt: 2, fontWeight: 'bold', color: '#555' }}
                            >
                                {image.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}


export default Gallery;
