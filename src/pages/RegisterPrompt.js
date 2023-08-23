import React, { useState } from "react";
import { Typography, Box, Button, Grid, Container, Modal } from "@mui/material";
import SignUp from '../components/SignUp';
import './RegisterPrompt.css';

const RegisterPrompt = () => {
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <Box className='home-background2' mt={10}>
      <Container>
        <Box my={5}>
          <Typography variant="h3" gutterBottom align="center">
            ¡Registrate ahora para valorar tus negocios favoritos, dejar reseñas y
            mucho más!
          </Typography>
        </Box>
        <Grid container justifyContent="center" my={5}>
          <Grid item>
            <Button variant="contained" color="primary" size="large" onClick={() => setOpenSignUp(true)}>
              ¡Registrate ahora!
            </Button>
          </Grid>
        </Grid>
        <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: '40%',
              minWidth: 300,
            }}
          >
            <SignUp />
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default RegisterPrompt;