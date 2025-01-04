import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import { COLORS, INDEX, MEDIA } from '@/theme';
import { IMargin } from '@/module/common/types';

export const Wrapper = styled.div<IMargin & { width?: string }>`
    position: relative;

    width: ${({ width }) => width ?? '100%'};
    
`;

export const Calendar = styled(DayPicker)`
    position: absolute;
    top: 2.5rem;
    right: -1rem;
    padding: 1rem;
    z-index: ${INDEX.absolute};
    cursor: pointer;

    background: ${COLORS.white};
    border: 1px solid ${COLORS.rgba(COLORS.black, 0.4)};
    border-radius: 0.25rem;

    @media screen and (max-width: ${MEDIA.tablet_s}) {
        border: none;
        margin: 1rem auto;
    }
`;
