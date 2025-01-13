import styled from 'styled-components';

export const Container = styled.div`
    h3 {
        margin: 0;
        font-size: 18px;
    }
    p {
        margin: 5px 0 0;
        color: ${({ theme }) => theme.COLORS.black};
        font-size: 14px;
    }
`;

export const StyledToastContainer = styled.div`
    .Toastify__toast {
        background-color: ${({ theme }) => theme.COLORS.white};
        color: ${({ theme }) => theme.COLORS.black};
        box-shadow: 0px 4px 6px ${({ theme }) => theme.COLORS.rgba(theme.COLORS.primary, 0.4)};
        padding: 10px;
        border-radius: 4px;
    }


    .Toastify__toast--success {
        border-left-color: ${({ theme }) => theme.COLORS.success};
    }

    .Toastify__toast--error {
        border-left-color: ${({ theme }) => theme.COLORS.error};
    }

    .Toastify__close-button > svg {
        fill: ${({ theme }) => theme.COLORS.black}
    }
`;
