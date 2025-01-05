import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

import { COLORS, INDEX, MEDIA } from '@/theme';
import { IMargin } from '@/module/common/types';

export const Wrapper = styled.div<IMargin & { width?: string }>`
    position: relative;

    width: ${({ width }) => width ?? '100%'};

    .rdp-day_selected,
    .rdp-day_selected:focus-visible,
    .rdp-day_selected:hover {
        background-color: ${COLORS.rgba(COLORS.primary, 0.2)};
        border-radius: 0;
        color: #2c2c2c;
    }

    .rdp-button_reset.rdp-button.rdp-day.rdp-day_selected.rdp-day_range_end.rdp-day_range_start {
        border-radius: 0;
    }

    .rdp-caption_label {
        color: #2c2c2c;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
    }

    .rdp-nav_icon {
        color: #98a2b3;
    }

    .rdp-nav_icon:hover {
        color: #4d5560;
    }

    .rdp-button_reset.rdp-button.rdp-nav_button.rdp-nav_button_previous:hover,
    .rdp-button_reset.rdp-button.rdp-nav_button.rdp-nav_button_next:hover {
        background: none;
    }

    .rdp-month {
        /*width: 21.4375rem;*/
        margin: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
    }

    .rdp-month:first-child {
        /*border-right: 1px solid #dce2ea;*/
        padding-right: 1rem;
    }

    .rdp-month:last-child {
        padding-left: 1rem;
    }

    .rdp-table {
        width: 100%;
        max-width: none;
    }

    .rdp-head_cell {
        color: #8aaed8;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        text-transform: none;
    }

    .rdp-head_cell:last-child,
    .rdp-head_cell:nth-last-child(2) {
        color: #f93232;
    }

    .rdp-cell {
        color: #2c2c2c;
        font-size: 0.875rem;
    }

    .rdp-day_today:not(.rdp-day_outside) {
        color: ${COLORS.white};
        background-color: ${COLORS.primary};
        border-radius: 0.125rem;
    }

    .rdp-button:not([disabled]) {
        /*height: 1.5rem;*/
        /*width: 1.5rem;*/
        /*border-radius: 0.125rem;*/
    }

    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
        color: ${COLORS.white};
        background-color: ${COLORS.primary};
        border-radius: 0;
    }


`;

export const Calendar = styled(DayPicker)`
    cursor: pointer;
    

    background: ${COLORS.white};
    border: 1px solid ${COLORS.rgba(COLORS.black, 0.4)};
    border-radius: 0.25rem;


    @media screen and (min-width: ${MEDIA.tablet} ) {
        position: absolute;
        top: 2.5rem;
        right: -1rem;
        padding: 1rem;
        z-index: ${INDEX.absolute};
    }

    @media screen and (max-width: ${MEDIA.tablet_s}) {
        margin: 0 auto;
    }
`;
