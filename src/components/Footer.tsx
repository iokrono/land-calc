import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        py: 2,
        px: 2,
        bgcolor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/logo/logo.svg"
              alt="IOKrono"
              sx={{ height: 20, width: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} IOKrono
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              component="button"
              onClick={() => navigate('/cookie-policy')}
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.875rem', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontFamily: 'inherit' }}
            >
              Cookie Policy
            </Link>
            <Link
              href="https://iokrono.com"
              target="_blank"
              rel="noopener noreferrer"
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.875rem' }}
            >
              IOKrono.com
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;