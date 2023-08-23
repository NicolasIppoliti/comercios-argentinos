import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    TextField,
    Button,
    Snackbar,
    Typography,
    Box,
    Alert,
    AlertTitle,
} from "@mui/material";
import { auth } from "../firebase";

const SignIn = ({ onCloseAndReload }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const validateForm = () => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailPattern.test(email)) {
            return "Por favor, ingrese un correo electrónico válido.";
        }

        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres.";
        }

        return null;
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
            setAlertMessage(`Error al iniciar sesion, intentelo de nuevo. — ${error}`);
            setShowAlert(true);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setOpen(true);
            onCloseAndReload();
        } catch (error) {
            setAlertMessage(`Error al iniciar sesion, intentelo de nuevo. — ${error.message}`);
            setShowAlert(true);
        }
    };

    return (
        <>
            <Typography variant="h4" component="h2" mb={3}>
                Inicia sesion
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Box sx={{ mt: 3 }}>
                    <Button fullWidth variant="contained" type="submit">
                        Iniciar sesión
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="User signed in successfully"
            />
        </>
    );
};

export default SignIn;