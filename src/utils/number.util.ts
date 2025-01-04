export const numberTransform = (
  number: number | string,
  targetUnit?: 'K' | 'M' | 'B' | 'T'
): string => {
  const units = ['K', 'M', 'B', 'T'];

  const convertNumber = (num: number): string => {
    if (num < 1000) return `${num}`;

    let unitIndex = targetUnit ? units.indexOf(targetUnit) : Math.floor(Math.log10(num) / 3 - 1);
    unitIndex = Math.max(0, Math.min(unitIndex, units.length - 1));

    const convertedValue = num / Math.pow(1000, unitIndex + 1);
    const roundedValue = Math.round(convertedValue * 10) / 10;

    return `${roundedValue}${units[unitIndex]}`;
  };

  if (typeof number === 'string' && !number.includes('/')) {
    return convertNumber(+number);
  }

  if (typeof number === 'string' && number.includes('/')) {
    const parts = number.split('/').map((part) => part.trim());

    const numerator = parseFloat(parts[0]);
    const denominator = parseFloat(parts[1]);

    const formattedNumerator = numerator === 0 ? '0' : convertNumber(numerator);
    const formattedDenominator = denominator === 0 ? '0' : convertNumber(denominator);

    return `${formattedNumerator} / ${formattedDenominator}`;
  }

  return `${number}`;
};
