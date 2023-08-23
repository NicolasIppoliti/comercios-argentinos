import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { TextField, Button, Snackbar, Typography, Box, AlertTitle, Alert } from '@mui/material';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const SignUp = ({ onCloseAndReload }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const validateForm = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phonePattern = /^\d{10}$/; // Asume números de teléfono de 10 dígitos

    if (!emailPattern.test(email)) {
      return 'Por favor, ingrese un correo electrónico válido.';
    }

    if (!phonePattern.test(phone)) {
      return 'Por favor, ingrese un número de teléfono válido.';
    }

    if (firstName.trim() === '' || lastName.trim() === '') {
      return 'Por favor, complete su nombre y apellido.';
    }

    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }

    return null;
  };

  const handleClose = () => {
    setOpen(false);
  };

  showAlert && (
    <Alert
      severity="error"
      onClose={() => {
        setShowAlert(false);
      }}
    >
      <AlertTitle>Error</AlertTitle>
      {alertMessage}
    </Alert>
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setAlertMessage(`Error al registrarse, intentelo de nuevo. — ${error}`);
      setShowAlert(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      });
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      setOpen(true);
      onCloseAndReload();
    } catch (error) {
      setAlertMessage(`Error al registrarse, intentelo de nuevo. — ${error.message}`);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2" mb={3}>
        Registra tus datos
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Box sx={{ mt: 3 }}>
          <Button fullWidth variant='contained' type="submit">Registrarse</Button>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Te has registrado exitosamente."
      />
    </>
  );
};

export default SignUp;