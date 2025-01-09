import styled from 'styled-components';
import { SPACES } from '@/theme';
import { motion } from 'framer-motion';

 export const Container = styled.section`
     width: 100%;
     background: ${({ theme }) => theme.COLORS.rgba(theme.COLORS.primary, 0.5)};
     display: flex;
     padding: ${SPACES.l};
     gap: ${SPACES.l};
     border-radius: 10px;

     user-select: none;

     & > * {
         user-select: none;
     }
 `;

export const Column = styled.div<{ $active: boolean }>`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: ${SPACES.xxxxxs};

    background-color: ${({
                             $active,
                             theme
                         }) => ($active ? theme.COLORS.rgba(theme.COLORS.primary, 0.2) : 'transparent')};
    transition: background-color 0.2s;
`;

export const DropIndicator = styled.div`
    margin-top: -0.125rem;
    margin-bottom: -0.125rem;
    height: 0.3rem;
    width: 100%;
    background-color: #a78bfa;
    opacity: 0;
`;

export const Row = styled(motion.div)`
    cursor: grab;
    border: 1px solid ${({ theme }) => theme.COLORS.primary};
    background: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.black};
    border-radius: 10px;
    padding: 1rem;
`;
