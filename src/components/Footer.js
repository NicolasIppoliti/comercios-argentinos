import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', py: 4 }}>
            <Container>
                <Typography variant="body1" align="center" gutterBottom>
                    &copy; {new Date().getFullYear()} Comercios Argentinos. Todos los derechos reservados.
                </Typography>
                <Typography variant="body2" align="center">
                    <Link href="/privacypolicy" color="inherit">
                        Politica de Privacidad
                    </Link>{' '}
                    |{' '}
                    <Link href="/termsconditions" color="inherit">
                        Terminos y Condiciones
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;