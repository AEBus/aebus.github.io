import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const NavButton = styled.button`
    display: flex;
    flex-flow: row;
    font-family: ${props => props.theme.ff};
    letter-spacing: ${props => props.theme.ls};
    color: ${props => props.theme.blue};
    font-size: .813rem;
    cursor: ${props => props.theme.btnCursor};
    outline: ${props => props.theme.btnOutline};
    background: ${props => props.theme.darkestbg};
    border: none;
    border-bottom: .063rem solid ${props => props.theme.darkestbg};
    transition: border-bottom 0.1s linear;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    align-self: center;

    &:hover {
        border-bottom: .063rem solid ${props => props.theme.blue};
    }

    &:active,
    &:focus {
        background: ${props => props.theme.cardbg};
    }
`;

const NavButtonA = props => {
    const { text, handleClick, history } = props;
    // refacotr and add a font-awesome icon inside
    return (
        <NavButton history={history} name={text} onClick={handleClick}>
            {props.children}
        </NavButton>
    )
};

export default withRouter(NavButtonA);