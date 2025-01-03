export const COLORS = {
  //default colors

  white: '#ffffff',
  white100: '#F3F3F3',
  white200: '#F5F6FE',
  black: '#000000',
  blue: '#0168E3',
  blueLight: '#91beea',
  mainRed: '#A23030',
  green: '#247B43',
  gray: '#6B6775',
  gray100: '#98a2b3',

  scroll_thumb: '#0168E3',
  scroll_track: '#91beea',


  rgba: (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  //scheme colors
};
