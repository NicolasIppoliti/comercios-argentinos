import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Modal, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Avatar } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Link as RouterLink } from 'react-router-dom';

const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
};

const UserAvatar = ({ firstName, lastName }) => {
    const initials = getInitials(firstName, lastName);

    return (
        <Avatar sx={{ bgcolor: 'primary.main' }}>
            {initials}
        </Avatar>
    );
};

const Navbar = () => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [user, setUser] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        }
    }, [auth]);

    const getUserFirstAndLastName = (displayName) => {
        if (!displayName) {
            return { firstName: 'N', lastName: 'A' };
        }

        const nameParts = displayName.split(' ');
        return {
            firstName: nameParts[0] || 'N',
            lastName: nameParts[1] || 'A',
        };
    };


    const handleOpenSignUp = () => {
        setOpenSignUp(true);
    };

    const handleCloseSignUp = () => {
        setOpenSignUp(false);
    };

    const handleOpenSignIn = () => {
        setOpenSignIn(true);
    };

    const handleCloseSignIn = () => {
        setOpenSignIn(false);
    };

    const handleModalCloseAndReload = () => {
        handleCloseSignUp();
        handleCloseSignIn();
        window.location.reload();
    };

    const handleClick = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navItems = [
        { text: 'Inicio', id: 'home' },
        { text: 'Buscador', id: 'search' },
        { text: 'Sobre nosotros', link: '/about' },
        !user && { text: 'Registrarse', action: handleOpenSignUp },
        !user && { text: 'Ingresar', action: handleOpenSignIn },
        user && {
            text: 'Avatar',
            action: () => { },
            avatar: true,
            displayName: user.displayName,
        },
    ].filter(Boolean);

    return (
        <AppBar position="sticky" color='inherit'>
            <Toolbar>
                <a href='/' style={{marginRight: 'auto'}}>
                    <img
                        src={logo}
                        alt="logo"
                        style={{ height: 40}}
                    />
                </a>
                {isMobile && (
                    <>
                        <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                {navItems.map((item, index) =>
                                    item.avatar ? (
                                        <ListItem key={item.text}>
                                            <UserAvatar
                                                firstName={getUserFirstAndLastName(
                                                    item.displayName
                                                ).firstName}
                                                lastName={getUserFirstAndLastName(
                                                    item.displayName
                                                ).lastName}
                                            />
                                        </ListItem>
                                    ) : (
                                        <ListItem
                                            button
                                            key={item.text}
                                            onClick={() => {
                                                item.id
                                                    ? handleClick(item.id)
                                                    : item.action();
                                                handleDrawerToggle();
                                            }}
                                        >
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Drawer>
                    </>
                )}
                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {navItems.map((item, index) => {
                            if (item.avatar) {
                                return (
                                    <UserAvatar
                                        key={item.text}
                                        firstName={getUserFirstAndLastName(item.displayName).firstName}
                                        lastName={getUserFirstAndLastName(item.displayName).lastName}
                                    />
                                );
                            } else {
                                return (
                                    <Button
                                        key={item.text}
                                        color="inherit"
                                        component={RouterLink}
                                        to={item.link}
                                    >
                                        {item.text}
                                    </Button>
                                );
                            }
                        })}
                    </Box>
                )}
            </Toolbar>
            <Modal open={openSignIn} onClose={handleCloseSignIn}>
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
                    <SignIn onCloseAndReload={handleModalCloseAndReload} />
                </Box>
            </Modal>
            <Modal open={openSignUp} onClose={handleCloseSignUp}>
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
                    <SignUp onCloseAndReload={handleModalCloseAndReload} />
                </Box>
            </Modal>
        </AppBar>
    );
};

export default Navbar;