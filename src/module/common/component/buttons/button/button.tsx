import { memo } from 'react';

import { Icon, Loader } from '@/module/common/component';
import { IButtonProps, TNavLink } from '@/module/common/types';
import { COLORS, SPACES } from '@/theme';

import * as Styled from './button.styled';

const ButtonContent =
  ({
     content,
     startIcon,
     endIcon,
     isLoading,
     height
   }: Pick<IButtonProps, 'content' | 'startIcon' | 'endIcon' | 'isLoading' | 'height'>) => {

    if (isLoading) {
      return <Loader
        className="loader"
        size="small"
        color={
          typeof isLoading === 'object' && isLoading.color ? isLoading?.color : COLORS.white
        }
        height={height ?? '2.5rem'}
        id={'loader'}
      />;
    }

    return <>
      {startIcon && (
        <Icon
          {...startIcon}
          mr={content || endIcon ? SPACES.xxs : undefined}
          className="startIcon"
        />
      )}
      {content}
      {endIcon && (
        <Icon
          {...endIcon}
          ml={content || startIcon ? SPACES.xxs : undefined}
          className="endIcon"
        />
      )}
    </>;
  };

const ButtonComponent =
  ({
     type,
     id,
     variant = 'primary',
     onClick,
     isLoading,
     startIcon, endIcon,
     ...props
   }: IButtonProps) => {
    const disabled = (typeof isLoading === 'boolean' && isLoading) || props.disabled;
    return (
      <Styled.StyledButton
        id={id}
        type={type ?? 'button'}
        variant={variant}
        {...props}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
        {...{ inert: disabled ? '' : undefined }}
      >
        <ButtonContent {...props} isLoading={isLoading} startIcon={startIcon} endIcon={endIcon} />
      </Styled.StyledButton>
    );
  };

const AsNavLink = ({ startIcon, endIcon, ...props }: TNavLink) => {
  const disabled = (typeof props.isLoading === 'boolean' && props.isLoading) || props.disabled;
  return (
    <Styled.NavLink
      {...{ inert: disabled ? '' : undefined }}
      {...props}
    >
      <ButtonContent {...props} startIcon={startIcon} endIcon={endIcon} />
    </Styled.NavLink>
  );
};

export const Button = Object.assign(memo(ButtonComponent), {
  AsNavLink
});

