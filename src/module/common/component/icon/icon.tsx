import { IIconInput, IMargin } from '@/module/common/types';
import { IconCommon, Margin } from '@/module/common/styles';
import styled from 'styled-components';


interface IImgIcon extends IMargin{
  height?: string
}

const ImgIcon = styled.img<IImgIcon>`
    height: ${({ height }) => height ?? '1.5rem'} !important;
    aspect-ratio: 1/1;

    ${Margin};
`;
export const Icon = (iconData: IIconInput) => {
  if (!iconData) return null;

  return iconData.type === 'img' ? (
    <ImgIcon id="icon" {...iconData} src={iconData.icon} alt="icon" className={iconData.className} />
  ) : (
    <IconCommon id="icon" {...(iconData as Omit<IIconInput, 'type'>)} className={iconData.className}/>
  );
};
