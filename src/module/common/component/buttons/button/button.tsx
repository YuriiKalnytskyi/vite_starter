import { memo } from 'react';

import { Loader } from '@/module/common/component';
import { IButtonProps } from '@/module/common/types';
import { COLORS } from '@/theme';

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
            height={restProps?.height ?? '2.5rem' }
            id={'loader'}
          />
        ) : (
          <>
            {startIcon ? (
              startIcon.type !== 'color' ? (
                <Styled.IconStart {...startIcon} className='start' />
              ) : (
                <Styled.ImgStart
                  src={startIcon.icon}
                  alt='icon'
                  height={startIcon.height ?? '1.5rem'}
                  className='startImg'
                />
              )
            ) : null}

            {content}

            {endIcon ? (
              endIcon.type !== 'color' ? (
                <Styled.IconEnd {...endIcon} className='endIcon' />
              ) : (
                <Styled.ImgEnd
                  src={endIcon.icon}
                  alt='icon'
                  height={endIcon.height ?? '1.5rem'}
                  className='endImg'
                />
              )
            ) : null}
          </>
        )}
      </Styled.StyledButton>
    );
  }
);
