import { animated, useTransition } from 'react-spring';
import { MouseEvent } from 'react';

import '@/styles/drawer.css';

import { IDrawerProps } from '../../types';
import { Portal } from '../portal';
import { config } from './drawer.config';
import * as Styled from './drawer.styled';

export const Drawer = ({
                         children,
                         slidePosition = 'right',
                         contentPosition = 'right',
                         open,
                         onClose
                       }: IDrawerProps) => {
  const transitions = useTransition(open, config[slidePosition]);

  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <Portal>
      {transitions(
        ({ opacity, transform }, isDrawerOpened) =>
          isDrawerOpened && (
            <animated.div
              className={`backdrop ${[contentPosition]}`}
              style={{ opacity }}
              onClick={onBackdropClick}
            >
              <Styled.Block style={{ transform }}>{children}</Styled.Block>
            </animated.div>
          )
      )}
    </Portal>
  );
};
