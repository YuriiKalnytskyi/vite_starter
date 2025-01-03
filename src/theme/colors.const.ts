export const COLORS = {
  //default colors

  primary: '#247B43',
  secondary: '',

  white: '#ffffff',
  black: '#000000',
  error: '#A23030',
  success: '#247B43',


  white100: '#F3F3F3',
  white200: '#F5F6FE',

  blue: '#0168E3',
  blueLight: '#91beea',
  mainRed: '#A23030',
  green: '#247B43',
  gray: '#6B6775',
  gray100: '#98a2b3',

  tableHeader: '#247B43',
  tableRowActive: '#a4e8bb',

  scroll_thumb: '#247B43',
  scroll_track: '#a4e8bb',


  rgba: (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  //scheme colors
};
