import React from 'react';
import { formatValue, formatValues } from '../service/area-calculator';
import { Card, CardContent, Typography, List, ListItem, ListItemButton, Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { Trans, useTranslation } from 'react-i18next';
import { HistoryItem } from '../types';

interface ResultHistoryProps {
  history: HistoryItem[];
  selectItem: (index: number) => void;
}

const ResultHistory: React.FC<ResultHistoryProps> = ({ history, selectItem }) => {
  const { t } = useTranslation();

  const formatFormula = (value: HistoryItem) =>
    formatValues(value.calcValues, t) + ' = ' + formatValue({ value: value.currentResult, type: 'm2' }, t);

  const handleSelectItem = (index: number) => {
    selectItem(index);
  };

  return (
    <Card
      sx={{
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon color="action" />
          <Trans i18nKey="components.ResultHistory.history" />
        </Typography>
        {history.length ? (
          <List disablePadding>
            {history.map((value, index) => (
              <ListItem key={`history-${index}`} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectItem(index)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    animation: 'slideIn 0.3s ease-out',
                    '@keyframes slideIn': {
                      from: { opacity: 0, transform: 'translateX(-20px)' },
                      to: { opacity: 1, transform: 'translateX(0)' },
                    },
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ fontFamily: 'monospace', flexGrow: 1 }}
                    >
                      {formatFormula(value)}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {t('components.ResultHistory.results.no-history')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultHistory;