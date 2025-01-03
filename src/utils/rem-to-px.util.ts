export const remToPx = (rem: string | number): string => {
  const REM_BASE_VALUE = 16;

  if (typeof rem === 'number') {
    const px = rem * REM_BASE_VALUE;

    return `${Number.isInteger(px) ? String(px) : px.toFixed(3)}px`;
  }

  const normalizedRem = rem.trim().toLowerCase().endsWith('rem')
    ? rem.slice(0, -3)
    : rem;

  const numValue = Number.parseFloat(normalizedRem);

  if (Number.isNaN(numValue)) {
    throw new Error('Parameter must contain a valid number or rem value');
  }

  const px = numValue * REM_BASE_VALUE;

  return `${Number.isInteger(px) ? String(px) : px.toFixed(3)}px`;
};