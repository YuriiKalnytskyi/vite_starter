import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    theme: string;
    COLORS: {
      primary: string,

      white:string,
      black: string,
      error: string,
      success: string,

      rgba: (hex: string, alpha: number)=> string
    };
  }
}
