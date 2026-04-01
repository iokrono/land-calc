import React, { useState } from 'react';
import { calcFromM2, formatValue, formatValues, types } from '../service/area-calculator';
import { Card, CardContent, Typography, Box, Grid, Snackbar, Alert } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { CalcValue, UnitType } from '../types';

const typeKeys = Object.keys(types) as UnitType[];

interface CurrentResultProps {
  calcValues: CalcValue[];
  currentResult: number;
}

const CurrentResult: React.FC<CurrentResultProps> = ({ calcValues, currentResult }) => {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const formatResult = (type: UnitType) => {
    return formatValue(
      {
        value: calcFromM2({ value: currentResult, type }),
        type,
      },
      t
    );
  };

  const formatFormula = () => formatValues(calcValues, t) + ' = ';

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          <Trans i18nKey="components.CurrentResult.result" />
        </Typography>
        {currentResult > 0 ? (
          <Box
            sx={{
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{ mb: 2, fontFamily: 'monospace', fontSize: '1.1rem' }}
            >
              {formatFormula()}
            </Typography>
            <Grid container spacing={2}>
              {typeKeys.map((key) => (
                <Grid size={{ xs: 6, sm: 4 }} key={key}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'grey.100',
                      borderRadius: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={() => handleCopy(formatResult(key))}
                  >
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ color: 'inherit', opacity: 0.7 }}>
                      {key.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {formatResult(key)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography color="text.secondary">-</Typography>
        )}
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CurrentResult;