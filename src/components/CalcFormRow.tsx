import React from 'react';
import { types } from '../service/area-calculator';
import { TextField, ToggleButtonGroup, ToggleButton, IconButton, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { CalcValue, UnitType } from '../types';

const calcTypes = Object.keys(types) as UnitType[];

interface CalcFormRowProps {
  index: number;
  calcValue: CalcValue;
  updateRow: (index: number, key: keyof CalcValue, value: string) => void;
  removeRow?: (index: number) => void;
}

const CalcFormRow: React.FC<CalcFormRowProps> = React.memo(({ index, calcValue, updateRow, removeRow }) => {
  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    updateRow(index, 'quantity', value);
  };

  const handleTypeChange = (_event: React.MouseEvent<HTMLElement>, value: UnitType | null) => {
    if (value) {
      updateRow(index, 'type', value);
    }
  };

  const handleRemoveRow = () => {
    if (removeRow) {
      removeRow(index);
    }
  };

  const friendlyName = (type: string) => t(`service.calculator.${type}.name`);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        type="number"
        placeholder={t('components.CalcFormRow.quantity')}
        value={calcValue.quantity}
        onChange={handleInputChange}
        autoFocus
        size="small"
        sx={{ minWidth: 120 }}
        inputProps={{
          'aria-label': t('components.CalcFormRow.quantity'),
        }}
      />
      <ToggleButtonGroup
        value={calcValue.type}
        exclusive
        onChange={handleTypeChange}
        aria-label="unit type"
        size="small"
        sx={{ flexGrow: 1, maxWidth: 500 }}
      >
        {calcTypes.map((calcType) => (
          <ToggleButton key={calcType} value={calcType} aria-label={friendlyName(calcType)}>
            {friendlyName(calcType)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {removeRow && (
        <IconButton
          onClick={handleRemoveRow}
          aria-label="remove row"
          size="small"
          color="error"
          sx={{ ml: 'auto' }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
});

CalcFormRow.displayName = 'CalcFormRow';

export default CalcFormRow;