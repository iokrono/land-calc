import React, { useState, useCallback, useEffect } from 'react';
import CalcForm from './CalcForm';
import CurrentResult from './CurrentResult';
import ResultHistory from './ResultHistory';
import { calcToM2, defaultType } from '../service/area-calculator';
import { CalcValue, HistoryItem, UnitType } from '../types';
import { Box, Typography, Grid } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';

const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const initialFormState: CalcValue = { type: Object.keys(defaultType)[0] as UnitType, quantity: '' };

  const [calcValues, setCalcValues] = useState<CalcValue[]>([initialFormState]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentResult, setCurrentResult] = useState<number>(0);

  useEffect(() => {
    const result = calcToM2(calcValues);
    setCurrentResult(result);
  }, [calcValues]);

  useEffect(() => {
    document.title = t('components.Calculator.title');
  }, [t]);

  const handleAddNewRow = () => {
    setCalcValues([...calcValues, initialFormState]);
  };

  const handleRemoveRow = (index: number) => {
    if (calcValues.length > 1) {
      setCalcValues(calcValues.filter((_, i) => i !== index));
    }
  };

  const handleRowInputChange = (index: number, key: keyof CalcValue, value: string) => {
    setCalcValues(
      calcValues.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const handleClearForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentResult) {
      setHistory([
        {
          calcValues,
          currentResult,
        },
        ...history,
      ]);
    }
    setCalcValues([initialFormState]);
  };

  const handleSelectItem = useCallback(
    (index: number) => {
      const selected = history[index];
      if (selected) {
        setCalcValues(selected.calcValues);
      }
    },
    [history]
  );

  return (
    <Box>
      <Typography variant="h1" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        <Trans i18nKey="components.Calculator.title" />
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CalcForm
            calcValues={calcValues}
            addNewRow={handleAddNewRow}
            removeRow={handleRemoveRow}
            rowInputChange={handleRowInputChange}
            clearForm={handleClearForm}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrentResult calcValues={calcValues} currentResult={currentResult} />
        </Grid>
        <Grid size={12}>
          <ResultHistory history={history} selectItem={handleSelectItem} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;