import React from 'react';
import { Typography, Box } from '@mui/material';

function About() {
    return (
        <Box>
            <Typography  mt={4} variant="h4" sx={{ fontWeight: 'bold', color: '#555' }}>O nas</Typography>
            <Typography>Witamy w naszym salonie stylizacji paznokci!</Typography>
        </Box>
    );
}

export default About;