import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '3.5rem',
        },
        h2: {
            fontSize: '3rem',
        },
        h3: {
            fontSize: '2.5rem',
        },
    },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;