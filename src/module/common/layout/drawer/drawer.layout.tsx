import { ReactNode } from 'react';

import { Loading } from '@/module/common/component/loading';
import { DivCommon, TitleCommon } from '@/module/common/styles';
import { FONTS } from '@/theme';

import * as Styled from './drawer.layout.styled';
import { ContentPositionType } from '@/module/common/types';
import { Drawer } from '@/module/common/component';

export interface IDrawerLayout {
  title: string | ReactNode;
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  children?: ReactNode;
  slidePosition: ContentPositionType;
  contentPosition: ContentPositionType;
}

export const DrawerLayout = ({
                               isLoading,
                               onClose,
                               open,
                               children,
                               title,
                               slidePosition,
                               contentPosition
                             }: IDrawerLayout) => {
  return (
    <Drawer
      onClose={onClose}
      open={open}
      contentPosition={contentPosition}
      slidePosition={slidePosition}>
      <Styled.Container>
        {isLoading ? <Loading className="full-screen" /> : null}
        <DivCommon fd="row" ai="center">
          {typeof title === 'string' ? (
            <TitleCommon fw={FONTS.WEIGHTS.semi_bold}>{title}</TitleCommon>
          ) : (
            <>
              {title}
            </>
          )}
          <Styled.CloseBtn onClick={onClose} />
        </DivCommon>

        {children}
      </Styled.Container>
    </Drawer>
  );
};
