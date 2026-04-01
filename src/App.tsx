import React from 'react';
import Calculator from './components/Calculator';
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        px: 2,
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
        <Calculator />
      </Box>
    </Box>
  );
};

export default App;