import { animated, useSpring } from 'react-spring';

import { ILoadingProps } from '@/module/common/types';
import '@/styles/loading.css';
import { COLORS } from '@/theme';

import * as Styled from './loading.styled';

export const Loading = ({ className, withAnimation, ...restProps }: ILoadingProps) => {
  const [styles, animation] = useSpring(() => ({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 200 }
  }));

  if (withAnimation) animation.start();

  return (
    <animated.div className={`loading ${className}`} style={styles} {...restProps}>
      <Styled.MyContainer>
        <Styled.Loader height='auto' color={COLORS.primary} />
      </Styled.MyContainer>
    </animated.div>
  );
};
