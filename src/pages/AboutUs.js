import React from "react";
import {
    Typography,
    Box,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AboutUs = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Sobre Nosotros
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Nuestra misión
                </Typography>
                <Typography>
                    Nuestra misión es facilitar el descubrimiento y la conexión entre las
                    personas y los negocios locales.
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Nuestra visión
                </Typography>
                <Typography>
                    Nuestra visión es convertirnos en el motor de búsqueda de negocios
                    locales líder en Argentina, y ser la primera opción para los usuarios
                    cuando busquen información sobre comercios y servicios en su área.
                </Typography>
                <Typography variant="h6" gutterBottom>
                    ¿Por qué elegirnos?
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Información precisa y actualizada sobre negocios locales
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Fácil navegación y búsqueda de negocios por categoría y ubicación
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Calificaciones y reseñas imparciales de otros usuarios
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Plataforma segura y protegida para los datos de los usuarios
                        </ListItemText>
                    </ListItem>
                </List>
                <Typography variant="h6" gutterBottom>
                    Contactanos
                </Typography>
                <Typography>
                    Nos encantaría saber de ti. Si tienes alguna pregunta, comentario o
                    sugerencia, no dudes en ponerte en contacto con nosotros
                </Typography>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Typography gutterBottom>
                        <strong>Dirección</strong> Mitre 853, Punta Alta, Argentina
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Telefono:</strong> +54 2932 432642
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Email:</strong> contact@yourbusinesssearch.com
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default AboutUs;
