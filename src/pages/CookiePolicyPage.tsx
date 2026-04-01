import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, Divider, useTheme, alpha, Paper, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const cookiePolicyImage = '/images/privacy.jpeg';

const CookiePolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Helmet>
        <title>{t('cookiePolicy.title')} | IOKrono</title>
        <meta name="description" content={t('cookiePolicy.intro')} />
      </Helmet>

      <Box
        sx={{
          position: 'relative',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${cookiePolicyImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          pt: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: 'white',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Back to Calculator
          </Button>
          <Box
            component="img"
            src="/logo/logo.svg"
            alt="IOKrono"
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
            {t('cookiePolicy.title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
            {t('cookiePolicy.lastUpdated')}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="body1" sx={{ mb: 8, fontSize: '1.2rem', lineHeight: 1.8, color: 'text.secondary' }}>
          {t('cookiePolicy.intro')}
        </Typography>

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.whatAreCookies.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t('cookiePolicy.sections.whatAreCookies.content')}
          </Typography>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.essentialCookies.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {t('cookiePolicy.sections.essentialCookies.content')}
          </Typography>
          <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                {t('cookiePolicy.sections.essentialCookies.note')}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.analyticsCookies.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {t('cookiePolicy.sections.analyticsCookies.content')}
          </Typography>
          <Card sx={{ bgcolor: alpha(theme.palette.warning.main, 0.08) }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {t('cookiePolicy.sections.analyticsCookies.note')}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.howToManage.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {t('cookiePolicy.sections.howToManage.content')}
          </Typography>
          <Grid container spacing={2}>
            {[
              { browser: t('cookiePolicy.sections.howToManage.chrome'), link: 'https://support.google.com/accounts/answer/61416' },
              { browser: t('cookiePolicy.sections.howToManage.firefox'), link: 'https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer' },
              { browser: t('cookiePolicy.sections.howToManage.safari'), link: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
              { browser: t('cookiePolicy.sections.howToManage.edge'), link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
            ].map((browser, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Card variant="outlined">
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {browser.browser}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.consent.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t('cookiePolicy.sections.consent.content')}
          </Typography>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.updates.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t('cookiePolicy.sections.updates.content')}
          </Typography>
        </Box>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            {t('cookiePolicy.sections.contact.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
            {t('cookiePolicy.sections.contact.content')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('cookiePolicy.sections.contact.note')}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: 4,
            bgcolor: alpha(theme.palette.info.main, 0.04),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.info.main, 0.12)}`,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {t('cookiePolicy.relatedPolicy')}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t('cookiePolicy.relatedPolicyLink')}{' '}
            <Box
              component="a"
              href="/privacy"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'underline',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t('cookiePolicy.privacyPolicy')}
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default CookiePolicyPage;