export type UnitType = 'm2' | 'ar' | 'ha' | 'km2' | 'chv' | 'jutro';

export interface CalcValue {
  type: UnitType;
  quantity: string;
}

export interface HistoryItem {
  calcValues: CalcValue[];
  currentResult: number;
}

export interface UnitDefinition {
  toM2: (num: number) => number;
  fromM2: (num: number) => number;
  format: (num: number) => string;
}

export interface CalculatorTypes {
  [key: string]: UnitDefinition;
}

export interface FormatOptions {
  value: number;
  type: UnitType;
}