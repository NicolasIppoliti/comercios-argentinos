import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import RegisterPrompt from './pages/RegisterPrompt';
import { Container, ThemeProvider, Box } from '@mui/material';
import PromotedBusiness from './pages/PromotedBusiness';
import responsiveTheme from './services/theme';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <ThemeProvider theme={responsiveTheme}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Box id="home">
                <HomePage />
              </Box>
              <Box id="promoted">
                <Container maxWidth='false'>
                  <PromotedBusiness />
                </Container>
              </Box>
              <Container maxWidth='xl'>
                <Box id="search">
                  <SearchResults />
                </Box>
              </Container>
              <Box id="register">
                <RegisterPrompt />
              </Box>
            </>
          } />
          <Route path='/about' element={<AboutUs/>} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsconditions" element={<TermsConditions />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;