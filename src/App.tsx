import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageTracker } from './components/PageTracker';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import CookiePolicyPage from './pages/CookiePolicyPage';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <BrowserRouter>
      <PageTracker />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
          px: 2,
          pb: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={i18n.language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hr">Hrvatski</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
      <CookieConsent />
    </BrowserRouter>
  );
};

export default App;