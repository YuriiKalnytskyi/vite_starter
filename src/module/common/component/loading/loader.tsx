import { ILoaderProps } from '../../types';
import * as Styled from './loading.styled';

export const Loader = ({ size, margin, className, id, ...restProps }: ILoaderProps) => (
  <Styled.MyContainer id={id} margin={margin} className={className}>
    <Styled.Loader size={size ?? 'medium'} {...restProps} />
  </Styled.MyContainer>
);
