import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Button, Link, Paper, useTheme, alpha } from '@mui/material';
import { grantConsent, revokeConsent, getConsent } from '../hooks/useConsent';

const CookieConsent: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [consent, setConsent] = useState(getConsent());

  useEffect(() => {
    const handleStorageChange = () => {
      setConsent(getConsent());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (consent === 'accepted') {
    return null;
  }

  const handleAccept = () => {
    grantConsent();
    setConsent('accepted');
  };

  const handleDecline = () => {
    revokeConsent();
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.modal + 1,
        backgroundColor: alpha(theme.palette.background.paper, 0.98),
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
          <Box
            component="img"
            src="/logo/logo.svg"
            alt="IOKrono"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('cookieConsent.title')}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {t('cookieConsent.description')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            flexShrink: 0,
            alignItems: { xs: 'stretch', sm: 'center' },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {t('cookieConsent.accept')}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleDecline}
            sx={{
              borderColor: theme.palette.text.disabled,
              color: theme.palette.text.secondary,
              '&:hover': {
                borderColor: theme.palette.text.primary,
                backgroundColor: alpha(theme.palette.text.primary, 0.04),
              },
              whiteSpace: 'nowrap',
            }}
          >
            {t('cookieConsent.decline')}
          </Button>
          <Link
            component="button"
            onClick={() => navigate('/cookie-policy')}
            underline="hover"
            sx={{
              fontSize: '0.875rem',
              color: theme.palette.text.secondary,
              display: 'flex',
              alignItems: 'center',
              pl: 1,
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            {t('cookieConsent.privacyPolicy')}
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default CookieConsent;