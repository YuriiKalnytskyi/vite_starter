import { memo } from 'react';

import { Icon, Loader } from '@/module/common/component';
import { IButtonProps } from '@/module/common/types';
import { COLORS, SPACES } from '@/theme';

import * as Styled from './button.styled';

export const Button = memo(
  ({
    content,
    type,
    id,
    variant = 'primary',
    startIcon,
    endIcon,
    onClick,
    isLoading,
    ...restProps
  }: IButtonProps) => {
    return (
      <Styled.StyledButton
        id={id}
        type={type ?? 'button'}
        variant={variant}
        {...restProps}
        disabled={(typeof isLoading === 'boolean' && isLoading) || restProps.disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      >
        {isLoading ? (
          <Loader
            className='loader'
            size='small'
            color={
              typeof isLoading === 'object' && isLoading.color ? isLoading?.color : COLORS.white
            }
            height={restProps?.height ?? '2.5rem'}
            id={'loader'}
          />
        ) : (
          <>
            {startIcon && (
              <Icon
                {...startIcon}
                mr={content || endIcon ? SPACES.xxs : undefined}
                className='startIcon'
              />
            )}
            {content}
            {endIcon && (
              <Icon
                {...endIcon}
                ml={content || startIcon ? SPACES.xxs : undefined}
                className='endIcon'
              />
            )}
          </>
        )}
      </Styled.StyledButton>
    );
  }
);
