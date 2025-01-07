import styled from 'styled-components';

import { CloseButton } from '@/module/common/component';
import {  FONTS, INDEX, MEDIA, SPACES } from '@/theme';
import {ContentPositionType} from "@/module/common/types";


export const Wrapper = styled.div`
    .confirm_purchase {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;

        background: rgba(0, 0, 0, 0.61);
        z-index: 4;
    }

    .confirm_purchase2 {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(0, 0, 0, 0.61);
        position: absolute;

        z-index: 4;
    }

    @media screen and (max-width: 768px) {
        .confirm_purchase2 {
            align-items: flex-end;
        }
    }

    .above-all {
        position: absolute;
        inset: 0;
    }

`;
export const Container = styled.div<{
  height?:string
  width?: string;
  minWidth?: string,
  $type: ContentPositionType
}>`
    z-index: ${INDEX.extreme_case};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3.5rem;
    width: ${({ width, $type }) => width ?? ($type === 'bottom' || $type === 'top') ? '100%' : '21rem'};
    height: ${({ height, $type }) => height ?? ($type === 'left' || $type === 'right' ? '100%' : '80%')};
    min-width: ${({ minWidth }) => minWidth ?? '21rem'};
    font-family: ${FONTS.FAMILIES.inter};
    border-radius: 12px;
    background: ${ ({theme})=>  theme.COLORS.white};
    box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

    position: relative;

    @media screen and (max-width: ${MEDIA.tablet}) {
        padding: 3.5rem 2rem;
    }

`;

export const ContainerBottom = styled.div<{ styled?: any }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3.5rem;
    width: 21rem;
    min-width: 21rem;
    font-family: ${FONTS.FAMILIES.inter};
    border-radius: 12px;
    background: ${ ({theme})=>  theme.COLORS.white};
    box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

    position: relative;

    & button:nth-of-type(1) {
        margin-bottom: ${SPACES.s};
    }

    @media screen and (max-width: ${MEDIA.tablet}) {
        width: 100%;
        max-height: 90%;
        border-radius: ${SPACES.l} ${SPACES.l} 0 0;
        padding: 1.5rem;
    }

    ${({ styled }) => styled};
`;

export const CloseBtn = styled(CloseButton)`
    width: 1rem;

    position: absolute;
    top: 1rem;
    right: 1rem;
`;
