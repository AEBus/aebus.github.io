import React, { useContext } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import InputFieldA from '@A/05-form_fields/InputFieldA';
import ServerSelectA from '@A/05-form_fields/ServerSelectA';
import SubmitButtonA from '@A/02-buttons/SubmitButtonA';
import ClipSpinnerA from '@A/06-spinners/ClipSpinnerA';

import { StateContext, DispatchContext } from '../../../App';

const API_HOST_URL = process.env.API_URL;

const Form = styled.form`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding-top: .813rem;
    border-top: .063rem solid ${props => props.theme.darkestbg};
`;

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const ChangeFormM = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { isLoading, userData } = state;
    const uId = userData.fbId;

    const handleSubmit = e => {
        e.preventDefault();
        const target = e.target;

        const character = target.character.value;
        const server = target.server.value;

        dispatch({ type: 'clearNotifications' }); // clean up errors

        if (server === 'default') { // checking if a server was selected
            dispatch({ type: 'formError', error: 'Please select a server.' });
            return;
        };

        dispatch({ type: 'loading' }); // START LOADING

        Axios.get(`https://xivapi.com/character/search?name=${character}&server=${server}`, { mode: 'cors' })
            .then(res => {
                const results = res.data.Results[0]; // results of fetch

                const charData = { // charData we need from fetch
                    id: results.ID,
                    avatar: results.Avatar,
                    charName: results.Name,
                    server: results.Server,
                };

                const options = {
                    token: userData.verificationToken,
                    character: charData,
                    userId: uId
                };

                Axios.post(`${API_HOST_URL}/api/auth/update`, options)
                    .then(response => {
                        const userData = response.data.user;
                        dispatch({ type: 'loading' });
                        dispatch({ type: 'user', userData: userData, discord: userData.verified });
                        return;
                    })
                    .catch(() => {
                        dispatch({ type: 'formError', error: 'There was a problem handling this request, please try again.' }); // if any issue posting to DB, dispatch error.
                    });
            })
            .catch(() => {
                dispatch({ type: 'formError', error: 'Character not found.' }); // if no char data is found on that server, dispatch error.
                return;
            });
    };

    return (

        <Form onSubmit={handleSubmit}>
            {isLoading ?
                <ClipSpinnerA />
                :
                <Container>
                    <InputFieldA
                        inputN='character'
                        inputT='text'
                        inputPlaceHolder='* Character Name'
                        require={true}
                    />
                    <ServerSelectA />
                    <SubmitButtonA
                        submitT='submit'
                        submitV='Set Character'
                    />
                </Container>
            }
        </Form>
    );
};

export default ChangeFormM;

