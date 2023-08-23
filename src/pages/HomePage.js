import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
  const handleClick = (id) => {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box className="home-background">
      <Container maxWidth='xl'>
        <Box>
          <Typography variant="h2" gutterBottom align="center" >
            Encontrá los mejores negocios locales y descubrí lo que tu ciudad tiene para ofrecerte
          </Typography>
          <Grid container justifyContent="center">
            <Grid item mt={5}>
              <Button variant="contained" onClick={() => handleClick('search')}>
                Explorar comercios
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;