import React, { useState, useEffect } from "react";
import {
    Card,
    Rating,
    CardContent,
    CardHeader,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
    Divider,
    Button,
    Box,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MapsIcon from "@mui/icons-material/Map";
import { makeStyles } from "@mui/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import {
    saveRating,
    getAverageRating,
    getUserRating,
    getRatingCount,
} from "../services/ratingService";
import { getCurrentTimeInArgentina, getOpenStatus } from "../utils/timeUtils";
import clsx from "clsx";
import styles from "./BusinessCard.module.css";

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: "56.25%",
    },

    typography: {
        paddingTop: "5%",
        paddingLeft: "5%",
    },
});

const BusinessCard = ({ business, onUpdateRating }) => {
    const classes = useStyles();
    const [rating, setRating] = useState(null);
    const [value, setValue] = useState(0);
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [openStatus, setOpenStatus] = useState({
        isOpen: false,
    });
    const [ratingCount, setRatingCount] = useState(0);

    useEffect(() => {
        const fetchRating = async () => {
            const averageRating = await getAverageRating(business.id);
            setValue(averageRating);

            if (user) {
                const userRating = await getUserRating(user.uid, business.id);
                setRating(userRating);
            }

            // Get the rating count
            const count = await getRatingCount(business.id);
            setRatingCount(count);
        };

        const currentTime = getCurrentTimeInArgentina();

        const status = getOpenStatus(business.openingHours, currentTime);

        setOpenStatus(status);
        fetchRating();
    }, [business.id, business.openingHours, user]);

    useEffect(() => {
        const updateRatings = async () => {
            const averageRating = await getAverageRating(business.id);
            setValue(averageRating);

            const count = await getRatingCount(business.id);
            setRatingCount(count);

            if (user) {
                const userRating = await getUserRating(user.uid, business.id);
                setRating(userRating);
            }
        };

        if (rating !== null) {
            updateRatings();
        }
    }, [business.id, rating, user]);

    const handleRatingChange = async (event, newValue) => {
        if (!user) {
            alert("Por favor, inicia sesión para poder calificar");
            return;
        }

        setRating(newValue);
        await saveRating(user.uid, business.id, newValue);
        const averageRating = await getAverageRating(business.id);
        setValue(averageRating);

        await onUpdateRating(business.id);
    };

    return (
        <Card>
            <CardMedia
                className={classes.media}
                image={business.logoUrl}
                title={business.name}
            />
            <Typography
                className={classes.typography}
                variant="body2"
                color="textSecondary"
                component="p"
            >
                {business.location}
            </Typography>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" component="div">
                            {business.name}
                        </Typography>
                    </Box>
                }
                subheader={
                    <>
                        <Typography variant="subtitle2">{`${business.category}`}</Typography>
                        <Box>
                            <Button
                                className={clsx(styles.openButton, {
                                    [styles.closedButton]: !openStatus.isOpen,
                                })}
                                disableElevation
                                color={openStatus.isOpen ? "success" : "error"}
                                variant="contained"
                                sx={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    fontSize: "0.8rem",
                                    borderRadius: "30px",
                                    marginTop: "2%",
                                }}
                            >
                                {openStatus.isOpen ? "ABIERTO" : "CERRADO"}
                            </Button>
                        </Box>
                    </>
                }
            />
            <Divider variant="middle" />
            <CardContent>
                <Rating
                    name={`rating-${business.id}`}
                    value={rating || value}
                    onChange={handleRatingChange}
                    precision={0.5}
                />
                <Typography variant="body2" color="text.secondary">
                    {`Valoración promedio: ${value === 0 ? 0 : value.toFixed(1)
                        } (${ratingCount} reseñas)`}
                </Typography>

                <CardActions>
                    <IconButton aria-label="Facebook" href={business.socials.facebook}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-label="Instagram" href={business.socials.instagram}>
                        <InstagramIcon />
                    </IconButton>
                    <IconButton
                        aria-label="WhatsApp"
                        href={`https://wa.me/${business.phone}`}
                    >
                        <WhatsAppIcon />
                    </IconButton>
                    <IconButton aria-label="Google Maps" href={business.address}>
                        <MapsIcon />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default BusinessCard;
