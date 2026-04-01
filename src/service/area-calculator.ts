import { CalculatorTypes, CalcValue, FormatOptions } from '../types';

export const types: CalculatorTypes = {
  m2: {
    toM2: (num: number) => num,
    fromM2: (num: number) => num,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 2 }),
  },
  ar: {
    toM2: (num: number) => 100 * num,
    fromM2: (num: number) => num / 100,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 4 }),
  },
  ha: {
    toM2: (num: number) => 10000 * num,
    fromM2: (num: number) => num / 10000,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 7 }),
  },
  km2: {
    toM2: (num: number) => 1000000 * num,
    fromM2: (num: number) => num / 1000000,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 8 }),
  },
  chv: {
    toM2: (num: number) => 3.596652 * num,
    fromM2: (num: number) => num / 3.596652,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 8 }),
  },
  jutro: {
    toM2: (num: number) => 5754.642 * num,
    fromM2: (num: number) => num / 5754.642,
    format: (num: number) => num.toLocaleString(undefined, { minimumFractionDigits: 9 }),
  },
};

export const defaultType = types.m2;

export const calcToM2 = (values: CalcValue[]): number => {
  const validValues = values.filter((value) => {
    return value.type && value.quantity && !Number.isNaN(Number(value.quantity));
  });

  if (validValues.length === 0) {
    return 0;
  }

  return validValues.reduce((prev, current) => {
    const num = Number(current.quantity);
    if (Number.isNaN(num)) return prev;
    const unitType = types[current.type];
    if (!unitType) return prev;
    return prev + unitType.toM2(num);
  }, 0);
};

export const calcFromM2 = ({ value, type }: FormatOptions): number => {
  return types[type].fromM2(Number(value));
};

export const friendlyName = (type: string, t: (key: string) => string): string => {
  return t(`service.calculator.${type}.name`);
};

export const formatValue = ({ value, type }: FormatOptions, t: (key: string) => string): string => {
  const currentType = types[type];
  if (!currentType) return '';
  return `${currentType.format(value)} ${friendlyName(type, t)}`;
};

export const formatValues = (values: CalcValue[], t: (key: string) => string): string => {
  const validValues = values.filter((value) => {
    return value.type && value.quantity && !Number.isNaN(Number(value.quantity));
  });

  return validValues.reduce((prev, current) => {
    const currentType = types[current.type];
    if (!currentType) return prev;
    const formatted = `${currentType.format(Number(current.quantity))} ${friendlyName(current.type, t)}`;
    return prev ? `${prev} + ${formatted}` : formatted;
  }, '');
};

export default {
  types,
  defaultType,
  calcToM2,
  calcFromM2,
  friendlyName,
  formatValue,
  formatValues,
};