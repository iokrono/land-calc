const types = {
    // 1 m2 = m2
    m2: {
        toM2: (num) => num,
        fromM2: (num) => num,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 2}),
        friendlyName: 'm2',
        friendlyLongName: 'četvrorni metar',
    },
    // 100 m2 = ar
    ar: {
        toM2: (num) => 100 * num,
        fromM2: (num) => num / 100,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 4}),
        friendlyName: 'ar',
        friendlyLongName: 'ar',
    },
    // 10 0000 m2 = hektar
    ha: {
        toM2: (num) => 10000 * num,
        fromM2: (num) => num / 10000,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 7}),
        friendlyName: 'ha',
        friendlyLongName: 'hektar',
    },
    // 1 000 000 m2
    km2: {
        toM2: (num) => 1000000 * num,
        fromM2: (num) => num / 1000000,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 8}),
        friendlyName: 'km2',
        friendlyLongName: 'četvrorni kilometar',
    },
    // 3.596652 m2 = cetvorni hvat
    chv: {
        toM2: (num) => 3.596652 * num,
        fromM2: (num) => num / 3.596652,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 8}),
        friendlyName: 'čhv',
        friendlyLongName: 'četvrorni hvati',
    },
    // 5754.642 m2 = jutro/ral
    jutro: {
        toM2: (num) => 5754.642 * num,
        fromM2: (num) => num / 5754.642,
        format: (num) => num.toLocaleString(undefined, {minimumFractionDigits: 9}),
        friendlyName: 'jutro/ral',
        friendlyLongName: 'jutro/ral',
    }
};

const defaultType = types.m2;

const calcToM2 = (values) => {
    return values
        .filter((value) => {
            return value.type && value.quantity;
        })
        .map((value) => {
            return types[value.type].toM2(Number(value.quantity));
        })
        .reduce((prev, current, index, arr) => {
            return prev + current;
        }, 0);
};

const calcFromM2 = ({value, type}) => {
    return types[type].fromM2(Number(value));
};

const formatValue = ({value, type}) => {
    const currentType = types[type];
    return `${currentType.format(value)} ${currentType.friendlyName}`;
};

const formatValues = (values) => {
    return values
        .filter((value) => {
            return value.type && value.quantity;
        })
        .reduce((prev, current, index, arr) => {
            const currentType = types[current.type];
            const formatted = `${currentType.format(current.quantity)} ${currentType.friendlyName}`;
            return prev ? `${prev} + ${formatted}` : formatted;
        }, '');
};

export default {
    types,
    defaultType,
    calcToM2,
    calcFromM2,
    formatValue,
    formatValues
};
