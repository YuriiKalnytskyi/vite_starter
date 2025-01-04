export interface IDivCommon {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  margin?: string;
  padding?: string;
  gap?: string;
  fd?: 'row' | 'row-reverse' | 'column-reverse' | 'column';
  jc?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  ai?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

  background?: string;

  anyStyled?: any;
}

export interface IIcon extends IMargin{
  icon: string;
  height?: string;
  background?: string;
  cursor?: 'pointer' | 'text';
}

export interface IIconInput extends IIcon {
  onClick?: () => void;
  type?: 'svg' | 'img' | string;
  className?:string
}

export interface IMargin {
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
}

export interface IPadding {
  pr?: string;
  pl?: string;
  pb?: string;
  pt?: string;
}

export interface IFonts extends IMargin {
  ff?: string;
  fw?: string;
  fs?: string;
  lh?: string;
  color?: string;
  cursor?: 'pointer' | 'text';
  ta?: 'left' | 'center' | 'right';
  width?: string;
}

export type OverflowType = 'auto' | 'scroll' | 'hidden';

export interface IScroll {
  oy?: OverflowType;
  ox?: OverflowType;

  scrollbar_display?: 'flex' | 'none';
  scrollbar_height?: string;
  scrollbar_width?: string;
  scrollbar_background?: string;
  scrollbar_thumb_background?: string;
}
