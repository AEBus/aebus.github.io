import React from 'react';
import styled from 'styled-components';

const SubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-self: center;
`;

const Submit = styled.input`
    display: flex
    flex: 2;
    border: none;
    padding: .25rem 1.313rem;
    background: ${props => props.theme.blue};
    color: ${props => props.theme.cardbg};
    font-family: ${props => props.theme.ff};
    border-bottom: .063rem solid ${props => props.theme.blue};
    border-radius: ${props => props.theme.brad};
    font-size: ${props => props.theme.btnFS};
    box-shadow: 0 .188rem .063rem -.125rem rgba(0,0,0,0.2), 0 .125rem .125rem 0 rgba(0,0,0,0.14), 0 .063rem .313rem 0 rgba(0,0,0,0.12);
    align-self: center;
    cursor: pointer;

    &:focus,
    &:active {
        transform: scale(1.1);
    }

    &:visited,
    &:focus,
    &:hover,
    &:active {
        text-decoration: none;
        outline: none;
    }
`;

const SubmitButtonA = props => {
    const { submitT, submitV } = props;
    return (
        <SubmitContainer>
            <Submit type={submitT} value={submitV} />
        </SubmitContainer>
    );
};

export default SubmitButtonA;