import React from 'react';
import CalcFormRow from './CalcFormRow';
import { Card, CardContent, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Trans } from 'react-i18next';
import { CalcValue } from '../types';

interface CalcFormProps {
  calcValues: CalcValue[];
  addNewRow: () => void;
  removeRow: (index: number) => void;
  rowInputChange: (index: number, key: keyof CalcValue, value: string) => void;
  clearForm: (event: React.FormEvent) => void;
}

const CalcForm: React.FC<CalcFormProps> = ({
  calcValues,
  addNewRow,
  removeRow,
  rowInputChange,
  clearForm,
}) => {
  const handleClearForm = (event: React.FormEvent) => {
    event.preventDefault();
    clearForm(event);
  };

  return (
    <Card
      component="form"
      onSubmit={handleClearForm}
      sx={{
        height: '100%',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {calcValues.map((calcValue, index) => (
            <CalcFormRow
              key={`row-${index}`}
              index={index}
              calcValue={calcValue}
              updateRow={rowInputChange}
              removeRow={calcValues.length > 1 ? removeRow : undefined}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={addNewRow}
            aria-label="add row"
          >
            <Trans i18nKey="components.CalcForm.addRow" />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<ClearIcon />}
            sx={{ ml: 'auto' }}
          >
            <Trans i18nKey="components.CalcForm.clear" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalcForm;