import calculator from './area-calculator';

describe('calculator', () => {

    it('simple calc to m2', () => {

        const values = [
            {
                type: "m2",
                quantity: 100
            }
        ];

        const result = calculator.calcToM2(values);
        expect(result).toEqual(100);
    });

    it('simple calc with multiple values', () => {

        const values = [
            {
                type: "m2",
                quantity: 100
            },
            {
                type: "km2",
                quantity: 1
            },
            {
                type: "chv",
                quantity: 2
            }
        ];

        const result = calculator.calcToM2(values);
        expect(result).toEqual(1000107.193304);
    });
});
