import React, { useContext } from 'react';
import styled from 'styled-components';

import { StateContext } from '../../../App';

import AuthHeaderButtonA from '@A/02-buttons/AuthHeaderButtonA';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-self: flex-start;
    justify-content: space-evenly;
    width: 100%;
    min-height: 3.125rem;
    border-bottom: .063rem solid ${props => props.theme.darkestbg};
`;

const LogInHeaderA = () => {
    const state = useContext(StateContext);
    const { formLogin, formCreate } = state;
    return (
        <Container>
            <AuthHeaderButtonA
                isActive={formLogin}
                text={'Log In'}
            />
            <AuthHeaderButtonA
                isActive={formCreate}
                text={'Create'}
            />
        </Container>
    );
};

export default LogInHeaderA;