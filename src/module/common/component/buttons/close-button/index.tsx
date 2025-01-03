import closeIcon from '@/assets/icons/default/close-icon.svg';
import { ICloseButtonProps } from '@/module/common/types';

import * as Styled from './close-button.styled';

export const CloseButton = ({ width, height, ...props }: ICloseButtonProps) => (
  <Styled.Button {...props}>
    <Styled.CloseIcon src={closeIcon} alt='close' width={width} height={height} />
  </Styled.Button>
);
