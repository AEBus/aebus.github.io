import React, { useContext } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';

import 'firebase/auth';

import AvatarContainerA from '@A/00-containers/AvatarContainerA';
import NavButtonA from '@A/02-buttons/NavButtonA';

import { DispatchContext } from '../../../App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCheck);

const IconContainer = styled.div`
    color: ${props => props.theme.green};
`;

const NavContainer = styled.div`
    display: flex;
    flex-flow: row;
    background: ${props => props.theme.darkestbg};
    justify-content: space-evenly;
    height: 100%;
    padding-top: .063rem;
`;

const TextContainer = styled.div`
    color: ${props => props.verified ? props.theme.green : props.theme.blue};
    margin-right: .313rem;
`;

const NavList = styled.ul`
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    list-style-type: none;
    margin: 0;
    padding: 0;

`;

const ListItem = styled.li`
    text-decoration: none;
`;

const NavButtonContainerA = props => {
    const dispatch = useContext(DispatchContext);

    const { userData, avatarURL, verified } = props;


    const handleLogout = () => {
        dispatch({ type: 'loading' });
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: 'logout' });
            });
    };

    return (
        <NavContainer>
            {userData.avatar && <AvatarContainerA url={avatarURL} />}
            <NavList>
                <ListItem>
                    <NavButtonA
                        handleClick={() => dispatch({ type: 'modalSwitch', modalType: 'verification' })}
                    >
                        <TextContainer>{verified ? 'Verified' : 'Get Verified'}</TextContainer>
                        {verified &&
                            <IconContainer>
                                <FontAwesomeIcon icon={faCheck} size='1x' />
                            </IconContainer>
                        }
                    </NavButtonA>
                </ListItem>
                <ListItem>
                    <NavButtonA handleClick={handleLogout}>
                        <TextContainer>Logout</TextContainer>
                    </NavButtonA>
                </ListItem>
            </NavList>
        </NavContainer>
    );
};

export default NavButtonContainerA;