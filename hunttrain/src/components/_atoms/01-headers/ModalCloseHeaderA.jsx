import React, { useContext } from 'react';
import styled from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DispatchContext } from '../../../App';

library.add(faTimes);

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
    width: 100%;
    border-bottom: .063rem solid ${props => props.theme.darkestbg};
    background: #444444;
`;

const Button = styled.button`
    display: flex;
    align-self: flex-end;
    color: ${props => props.theme.fntClr};
    background: #444444;
    border: none;

    &:visited,
    &:focus,
    &:hover,
    &:active {
    text-decoration: none;
    outline: none;
    color: ${props => props.theme.red};
    }
`;

const ModalCloseHeaderA = () => {
    const dispatch = useContext(DispatchContext);
    const handleClick = () => {
        dispatch({ type: 'modal' });
    };

    return (
        <Header>
            <Button onClick={handleClick}>
                <FontAwesomeIcon icon={faTimes} size='2x' />
            </Button>
        </Header>
    );
};

export default ModalCloseHeaderA;