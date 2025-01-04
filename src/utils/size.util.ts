export const sizeTransform = (
  bytes: number,
  targetUnit?: 'Bytes' | 'KB' | 'MB' | 'GB',
  isDecimal?: boolean
): string => {
  if (+bytes === 0) return '0 Byte';
  if (isNaN(bytes) || bytes === undefined) return String(bytes);

  const sizeTypes = ['Bytes', 'KB', 'MB', 'GB'];

  if (targetUnit) {
    const typeIndex = sizeTypes.indexOf(targetUnit);
    const size = bytes / Math.pow(1024, typeIndex);
    const roundedSize = isDecimal ? Math.round(size * 100) / 100 : Math.round(size);

    return `${roundedSize} ${sizeTypes[typeIndex]}`;
  }

  const type = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, type);
  const roundedSize = isDecimal ? Math.round(size * 100) / 100 : Math.round(size);

  return `${roundedSize} ${sizeTypes[type]}`;
};
