import styled, { css } from 'styled-components';

import { Fonts, SubTitleCommon } from '@/module/common/styles';
import { COLORS, FONTS, SPACES } from '@/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const WrapperInputUser = styled.div<{ readOnly: boolean | undefined }>`
  width: 100%;
  padding: ${SPACES.l};
  border-bottom: 1px solid ${COLORS.gray350};
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: ${SPACES.xxxxl};
  ${({ readOnly }) =>
    readOnly &&
    css`
      & > .edit {
        opacity: 0.3;
        pointer-events: none;
      }
    `}

  & > div {
    display: flex;
    flex-direction: column;
  }

  & p.value {
    ${Fonts};
    font-weight: ${FONTS.WEIGHTS.normal};
    font-size: ${FONTS.SIZES.m};
    color: ${COLORS.gray800};
    padding-top: ${SPACES.xxs};
  }

  & > form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    column-gap: ${SPACES.l};

    & > div.buttons {
      display: flex;
      align-items: center;
      height: 100%;
      gap: ${SPACES.xxs};
    }

    & label {
      ${Fonts};
      font-weight: ${FONTS.WEIGHTS.medium};
    }

    & input {
      ${Fonts};
      caret-color: ${COLORS.blue400};
      font-size: ${FONTS.SIZES.l};
    }

    & button.save {
      border: none;
      background: none;

      & > div:hover {
        background: ${COLORS.blue400};
      }
    }

    & button.cancel {
      border: none;
      background: none;

      & > div:hover {
        background: ${COLORS.redRemove};
      }
    }
  }
`;
export const Label = styled(SubTitleCommon)`
  font-weight: ${FONTS.WEIGHTS.semi_bold};
  font-size: ${FONTS.SIZES.l};
`;

export const Container = styled.span`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;
