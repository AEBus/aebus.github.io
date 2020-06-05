import React, { useContext } from 'react';
import styled from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DispatchContext } from '../../../App';

library.add(faQuestionCircle);

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-left: .5rem;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    color: ${props => props.theme.blue};
    cursor: ${props => props.theme.btnCursor};
    outline: ${props => props.theme.btnOutline};
    background: ${props => props.theme.darkestbg};
    border: none;
`;

const GuideButtonA = () => {
    const dispatch = useContext(DispatchContext);

    return (
        <Container>
            <Button onClick={() => dispatch({ type: 'modalSwitch', modalType: 'guide' })}>
                <FontAwesomeIcon icon={faQuestionCircle} size='2x' />
            </Button>
        </Container>
    );
};

export default GuideButtonA;