import { ReactNode } from 'react';

import { Loading } from '@/module/common/component/loading';
import { DivCommon, TitleCommon } from '@/module/common/styles';
import { FONTS } from '@/theme';

import * as Styled from './drawer.layout.styled';

export interface IDrawerLayout {
  title: string;

  isLoading?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const DrawerLayout = ({ isLoading, onClose, children, title }: IDrawerLayout) => {
  return (
    <Styled.Container>
      {isLoading ? <Loading className='full-screen' /> : null}
      <DivCommon fd='row' ai='center'>
        <TitleCommon fw={FONTS.WEIGHTS.semi_bold}>{title}</TitleCommon>
        <Styled.CloseBtn onClick={onClose} />
      </DivCommon>

      {children}
    </Styled.Container>
  );
};
