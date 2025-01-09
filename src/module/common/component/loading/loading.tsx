import {AnimatePresence, motion} from 'framer-motion';
import {ILoadingProps} from '@/module/common/types';
import * as Styled from './loading.styled';
import {useTheme} from 'styled-components';

export const Loading = ({withAnimation}: ILoadingProps) => {
    const theme = useTheme();


    return (
        <AnimatePresence>
            {withAnimation && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                >
                    <Styled.MyContainer>
                        <Styled.Loader height="auto" color={theme.COLORS.primary}/>
                    </Styled.MyContainer>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
