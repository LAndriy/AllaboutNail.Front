import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Grid } from '@mui/material';

function Services() {
    const mainCategories = [
        {
            category: "Manicure",
            services: [
                { name: "Manicure hybrydowy", price: "60 zł" },
                { name: "Manicure klasyczny", price: "50 zł" },
                { name: "Manicure japoński", price: "75 zł" },
            ],
        },
        {
            category: "Pedicure",
            services: [
                { name: "Pedicure klasyczny", price: "80 zł" },
                { name: "Pedicure hybrydowy", price: "100 zł" },
            ],
        },
    ];

    const addons = [
        { name: "Zdobienia artystyczne", price: "10 zł za paznokieć" },
        { name: "Ściąganie hybrydy", price: "20 zł" },
        { name: "Naprawa paznokcia", price: "15 zł" },
    ];

    return (
        <Box>
            <Typography mt={4} variant="h4" sx={{ fontWeight: 'bold', color: '#555' }}>
                Usługi
            </Typography>
            <Typography mt={2} mb={4}>
                Zapoznaj się z naszymi usługami stylizacji paznokci.
            </Typography>
            <Grid container spacing={4}>
                {/* Główne kategorie */}
                <Grid item xs={12} md={8}>
                    {mainCategories.map((category, index) => (
                        <Box key={index} mb={4}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {category.category}
                            </Typography>
                            <List>
                                {category.services.map((service, idx) => (
                                    <ListItem key={idx} sx={{ pl: 0 }}>
                                        <ListItemText
                                            primary={service.name}
                                            secondary={service.price}
                                            primaryTypographyProps={{
                                                sx: { fontSize: '1rem', fontWeight: '500' },
                                            }}
                                            secondaryTypographyProps={{
                                                sx: { fontSize: '0.875rem', color: '#777' },
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}
                </Grid>

                {/* Dodatki */}
                <Grid item xs={12} md={4}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                            Dodatki
                        </Typography>
                        <List>
                            {addons.map((addon, idx) => (
                                <ListItem key={idx} sx={{ pl: 0 }}>
                                    <ListItemText
                                        primary={addon.name}
                                        secondary={addon.price}
                                        primaryTypographyProps={{
                                            sx: { fontSize: '1rem', fontWeight: '500' },
                                        }}
                                        secondaryTypographyProps={{
                                            sx: { fontSize: '0.875rem', color: '#777' },
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Services;
