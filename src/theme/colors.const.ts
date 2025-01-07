const rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const lightTheme = {
  theme: 'light',
  COLORS: {
    primary: '#247B43',

    white: '#ffffff',
    black: '#000000',
    error: '#A23030',
    success: '#247B43',

    rgba
  }
};

export const darkTheme = {
  theme: 'light',
  COLORS: {
    primary: '#143bbe',

    white: '#ffffff',
    black: '#000000',
    error: '#A23030',
    success: '#247B43',

    rgba
  }
};

