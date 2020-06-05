import React, { useContext } from 'react';
import styled from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faSquare, faCheckSquare);

import { StateContext, DispatchContext } from '../../../App';

const Container = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: center;
`;

const Label = styled.label`
    color: ${props => props.theme.fntClr};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: .813rem;
    align-self: flex-start;
`;

const Button = styled.button`
    display: inline-block;
    outline: none;
    color: ${props => props.theme.fntClr};
    background: ${props => props.theme.cardbg};
    cursor: pointer;
    border: none;
`;

const RadioButtonA = props => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const { radioChecked } = state;
    const { text } = props;

    const handleChange = e => {
        e.preventDefault();
        dispatch({ type: 'radio' });
    };

    return (
        <Container>
            <Label>
                <Button onClick={handleChange} >
                    {!radioChecked ?
                        <FontAwesomeIcon icon={faSquare} size='1x' />
                        :
                        <FontAwesomeIcon icon={faCheckSquare} size='1x' />
                    }
                </Button>
                {text}
            </Label>
        </Container>
    );
};

export default RadioButtonA;