import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';

import { DispatchContext, StateContext } from '../../../App';

import ThemedButtonA from '@A/02-buttons/ThemedButtonA';
import ErrorNotificationA from '@A/03-notifications/ErrorNotificationA';

const Input = styled.input`
    border-radius: ${props => props.theme.brad};
    font-family: ${props => props.theme.ff};
    background: #DFDFDF;
    font-size: ${props => props.theme.btnFS};
    font-color: ${props => props.theme.darkBG};
    letter-spacing: ${props => props.theme.ls};
    text-align: center;

    &:focus {
        outline: none;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    margin: .313rem;

`;

const JoinButtonM = props => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const { joinURL, error } = state;
    const { allow, history } = props;

    const fbDatabase = firebase.database();
    const cardRef = fbDatabase.ref(`cards/${joinURL}`)

    joinURL === '' && dispatch({ type: 'clear' });

    const handleChange = e => {
        e.preventDefault();
        const target = e.target;
        dispatch({ type: 'join', value: target.value });
    };

    const handleJoin = e => {
        e.preventDefault();
        dispatch({ type: 'updateKey', cardKey: joinURL })
        history.push(joinURL);
    }

    return (
        <>
            <ThemedButtonA // prettier-ignore
                handleClick={handleJoin}
                text="Join in-progress"
                isDisabled={!allow}
                inverted={true}
            />
            <InnerContainer>
                <Input onChange={handleChange} placeholder={'Paste a key to join...'} />
                <ErrorNotificationA error={error} />
            </InnerContainer>
        </>
    );
};

export default withRouter(JoinButtonM);
