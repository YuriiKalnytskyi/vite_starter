import styled from 'styled-components';

import { IconCommon, Margin } from '@/module/common/styles';
import { IIconInput, IMargin } from '@/module/common/types';

interface IImgIcon extends IMargin {
  height?: string;
}

const ImgIcon = styled.img.withConfig({
  shouldForwardProp: (prop) => !['mr', 'ml', 'mt', 'mb'].includes(prop),
})<IImgIcon>`
  height: ${({ height }) => height ?? '1.5rem'} !important;
  aspect-ratio: 1/1;

  ${Margin};
`;
export const Icon = (iconData: IIconInput) => {
  if (!iconData) return null;

  return iconData.type === 'img' ? (
    <ImgIcon
      id='icon'
      {...iconData}
      src={iconData.icon}
      alt='icon'
      className={iconData.className}
    />
  ) : (
    <IconCommon
      id='icon'
      {...(iconData as Omit<IIconInput, 'type'>)}
      className={iconData.className}
    />
  );
};
