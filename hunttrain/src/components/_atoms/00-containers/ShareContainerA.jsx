import React, { useRef } from 'react';
import styled from 'styled-components';

import StyledButtonA from '@A/02-buttons/StyledButtonA';

const Container = styled.div`
    display: flex;
    align-self: center;
    background-color: ${props => props.theme.cardbg};
    border-radius: ${props => props.theme.brad};
    box-shadow: ${props => !props.verify && props.theme.bshad};
    margin: ${props => props.theme.margin};
    display: flex;
    width: ${props => props.verify && '80%'};
    justify-content: center;
    align-content: center;
    padding: ${props => props.theme.pad};
`;

// needs input
const Input = styled.input`
    display: flex;
    border-radius: ${props => props.theme.brad};
    font-family: ${props => props.theme.ff};
    letter-spacing: ${props => props.theme.ls};
    margin-right: .313rem;
`;

const Wrapper = styled.div`
    display: flex;
    flex-flow: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`;

const ShareContainerA = props => {
    const { text, val, verify } = props;
    const valRef = useRef(null);

    const handleCopy = () => {
        valRef.current.select();
        document.execCommand('copy');
    };

    return (
        <Container verify={verify}>
            <Wrapper>
                <Input ref={valRef} value={val} readOnly />
                <StyledButtonA handleClick={handleCopy} text={text} />
            </Wrapper>
        </Container>
    );
}

export default ShareContainerA;