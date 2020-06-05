import React from 'react';
import styled from 'styled-components';

import SignInContainerA from '@A/00-containers/SignInContainerA';
import ModalCloseHeaderA from '@A/01-headers/ModalCloseHeaderA';

const Container = styled.div`
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    align-self: center;
    width: 24rem;
    overflow: auto;
    radius: ${props => props.theme.brad};
    margin: .5rem;
    background: ${props => props.theme.cardbg};
    box-shadow: ${props => props.theme.bshad};
`;

const LogInFormM = () => {
    return (
        <Container>
            <ModalCloseHeaderA />
            <SignInContainerA />
        </Container>
    );
};

export default LogInFormM;