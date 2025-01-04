import React from 'react';
import Lottie, { Options } from 'react-lottie';

import { ILottieAnimation } from './lottie.types';

interface ILottieAnimationProps {
  animation: ILottieAnimation;
  height: string;
  width: string;
  isPosition?: boolean;
  top?: string;
}

export const LottieAnimation: React.FC<ILottieAnimationProps> = ({
  animation,
  height,
  width,
  isPosition,
  top
}) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        style={isPosition ? { position: 'absolute', top: top ?? '5%', right: '0' } : {}}
      />
    </div>
  );
};
