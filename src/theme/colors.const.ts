export const COLORS = {
  //default colors

  primary: '#247B43',
  secondary: '',

  white: '#ffffff',
  black: '#000000',
  error: '#A23030',
  success: '#247B43',
  
  rgba: (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  //scheme colors
};
