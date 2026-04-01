import { describe, it, expect } from 'vitest';
import { calcToM2, calcFromM2, types, friendlyName, formatValue, formatValues, defaultType } from './area-calculator';
import { CalcValue, UnitType } from '../types';

const mockT = (key: string) => key;

describe('area-calculator', () => {

  describe('calcToM2', () => {
    it('converts single m2 value correctly', () => {
      const values: CalcValue[] = [{ type: 'm2' as UnitType, quantity: '100' }];
      expect(calcToM2(values)).toBe(100);
    });

    it('converts multiple unit values correctly', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'km2' as UnitType, quantity: '1' },
        { type: 'chv' as UnitType, quantity: '2' },
      ];
      expect(calcToM2(values)).toBeCloseTo(1000107.193304, 6);
    });

    it('returns 0 for empty array', () => {
      expect(calcToM2([])).toBe(0);
    });

    it('filters out invalid quantities', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'm2' as UnitType, quantity: '' },
        { type: 'm2' as UnitType, quantity: 'abc' },
      ];
      expect(calcToM2(values)).toBe(100);
    });

    it('handles zero values', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '0' },
        { type: 'ha' as UnitType, quantity: '0' },
      ];
      expect(calcToM2(values)).toBe(0);
    });

    it('converts all unit types correctly', () => {
      expect(calcToM2([{ type: 'ar' as UnitType, quantity: '1' }])).toBe(100);
      expect(calcToM2([{ type: 'ha' as UnitType, quantity: '1' }])).toBe(10000);
      expect(calcToM2([{ type: 'km2' as UnitType, quantity: '1' }])).toBe(1000000);
      expect(calcToM2([{ type: 'chv' as UnitType, quantity: '1' }])).toBeCloseTo(3.596652, 6);
      expect(calcToM2([{ type: 'jutro' as UnitType, quantity: '1' }])).toBeCloseTo(5754.642, 3);
    });
  });

  describe('calcFromM2', () => {
    it('converts m2 to m2', () => {
      expect(calcFromM2({ value: 100, type: 'm2' })).toBe(100);
    });

    it('converts m2 to ar', () => {
      expect(calcFromM2({ value: 100, type: 'ar' })).toBe(1);
    });

    it('converts m2 to ha', () => {
      expect(calcFromM2({ value: 10000, type: 'ha' })).toBe(1);
    });

    it('converts m2 to km2', () => {
      expect(calcFromM2({ value: 1000000, type: 'km2' })).toBe(1);
    });

    it('converts m2 to chv', () => {
      expect(calcFromM2({ value: 3.596652, type: 'chv' })).toBeCloseTo(1, 6);
    });

    it('converts m2 to jutro', () => {
      expect(calcFromM2({ value: 5754.642, type: 'jutro' })).toBeCloseTo(1, 3);
    });
  });

  describe('types', () => {
    it('has all expected unit types', () => {
      expect(Object.keys(types)).toEqual(['m2', 'ar', 'ha', 'km2', 'chv', 'jutro']);
    });

    it('formats m2 correctly', () => {
      expect(types.m2.format(1234.5)).toBe('1,234.50');
    });

    it('formats ar with 4 decimal places', () => {
      expect(types.ar.format(1.23456)).toBe('1.2346');
    });

    it('formats ha with 7 decimal places', () => {
      expect(types.ha.format(1.0000001)).toBe('1.0000001');
    });

    it('formats km2 with 8 decimal places', () => {
      expect(types.km2.format(1.00000001)).toBe('1.00000001');
    });

    it('formats chv with 8 decimal places', () => {
      expect(types.chv.format(1.12345678)).toBe('1.12345678');
    });

    it('formats jutro with 9 decimal places', () => {
      expect(types.jutro.format(1.123456789)).toBe('1.123456789');
    });
  });

  describe('friendlyName', () => {
    it('returns translated name for valid type', () => {
      expect(friendlyName('m2', mockT)).toBe('service.calculator.m2.name');
      expect(friendlyName('ha', mockT)).toBe('service.calculator.ha.name');
    });
  });

  describe('formatValue', () => {
    it('formats value with correct unit', () => {
      expect(formatValue({ value: 100, type: 'm2' }, mockT)).toBe('100.00 service.calculator.m2.name');
    });

    it('returns empty string for invalid type', () => {
      expect(formatValue({ value: 100, type: 'invalid' as UnitType }, mockT)).toBe('');
    });

    it('formats ha correctly', () => {
      expect(formatValue({ value: 1.5, type: 'ha' }, mockT)).toBe('1.5000000 service.calculator.ha.name');
    });
  });

  describe('formatValues', () => {
    it('formats single value correctly', () => {
      const values: CalcValue[] = [{ type: 'm2' as UnitType, quantity: '100' }];
      expect(formatValues(values, mockT)).toBe('100.00 service.calculator.m2.name');
    });

    it('formats multiple values with plus separator', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'ar' as UnitType, quantity: '5' },
      ];
      expect(formatValues(values, mockT)).toBe('100.00 service.calculator.m2.name + 5.0000 service.calculator.ar.name');
    });

    it('returns empty string for empty array', () => {
      expect(formatValues([], mockT)).toBe('');
    });

    it('filters out invalid quantities', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'm2' as UnitType, quantity: '' },
        { type: 'm2' as UnitType, quantity: 'abc' },
      ];
      expect(formatValues(values, mockT)).toBe('100.00 service.calculator.m2.name');
    });

    it('skips invalid unit types', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'invalid' as UnitType, quantity: '50' },
      ];
      expect(formatValues(values, mockT)).toBe('100.00 service.calculator.m2.name');
    });
  });

  describe('defaultType', () => {
    it('is types.m2', () => {
      expect(defaultType).toBe(types.m2);
    });
  });

  describe('calcFromM2 edge cases', () => {
    it('handles large values', () => {
      expect(calcFromM2({ value: 10000000, type: 'm2' })).toBe(10000000);
      expect(calcFromM2({ value: 10000000, type: 'km2' })).toBe(10);
    });

    it('handles small values', () => {
      expect(calcFromM2({ value: 0.000001, type: 'm2' })).toBe(0.000001);
    });
  });

  describe('calcToM2 edge cases', () => {
    it('skips invalid unit types', () => {
      const values: CalcValue[] = [
        { type: 'm2' as UnitType, quantity: '100' },
        { type: 'invalid' as UnitType, quantity: '50' },
      ];
      expect(calcToM2(values)).toBe(100);
    });

    it('handles negative values', () => {
      const values: CalcValue[] = [{ type: 'm2' as UnitType, quantity: '-50' }];
      expect(calcToM2(values)).toBe(-50);
    });

    it('handles decimal quantities', () => {
      const values: CalcValue[] = [{ type: 'm2' as UnitType, quantity: '10.5' }];
      expect(calcToM2(values)).toBe(10.5);
    });
  });
});