import JoditEditor from 'jodit-react';
import styled from 'styled-components';

export const WrapeerJoditEditor = styled(JoditEditor)`
    .jodit-wysiwyg {
        overflow: auto;
        min-height: 20rem !important;
        max-height: 40rem !important;
    }
`;
