import React, { useContext } from 'react';
import styled from 'styled-components';

import AvatarContainerA from '@A/00-containers/AvatarContainerA';
import CharacterFieldsA from '@A/05-form_fields/CharacterFieldsA';
import ClipSpinnerA from '@A/06-spinners/ClipSpinnerA';
import StyledButtonA from '@A/02-buttons/StyledButtonA';
import Axios from 'axios';

import { StateContext, DispatchContext } from '../../../App';

/**
 * Contains Character Avatar, name, server, and Verify button.
 * Used in: <VerificationFormM />
 */

const API_HOST_URL = process.env.API_URL;

const CharacterContainer = styled.div`
    display: flex;
    flex-flow: row;
    align-self: center;
    width: 80%;
    justify-content: space-evenly;
    margin-bottom: .625rem;
`;

const CharacterContainerA = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const { isLoading, userData } = state;

    const avatarURL = userData.avatar,
        server = userData.server,
        character = userData.charName;


    /**
     * clickHandler that checks for character verification.
     */
    const handleVerify = async () => {
        const token = userData.verificationToken,
            userId = userData.id;

        dispatch({ type: 'clearNotifications' });
        dispatch({ type: 'loading' });

        /**
         * retrieves profile data for current FFXIV character from state.
         */
        const xivFetch = async () => {
            const xivData = await Axios.get(`https://xivapi.com/character/${userId}`, { mode: 'cors' })
            const bio = xivData.data.Character.Bio;
            const verified = bio.includes(token);

            return { bio, verified };
        };

        /**
         * posts to database if character was verified.
         */
        const characterPost = async () => {
            const options = {
                userData: userData
            };
            const postResponse = await Axios.post(`${API_HOST_URL}/api/auth/verify`, options);
            return postResponse.data.user;
        }

        try {
            const xivData = await xivFetch();
            if (!xivData.verified) return dispatch({ type: 'formError', error: 'Unable to verify. Please check the token and try again.' });
            const postedCharacterData = await characterPost(xivData);
            // dispatch sets userData and whether character has been verified.
            postedCharacterData && dispatch({ type: 'user', userData: postedCharacterData, discord: postedCharacterData.verified });

        } catch (error) {
            console.log(error);
            dispatch({ type: 'formError', error: 'There was a problem with this request. Please try again.' });
        } finally {
            dispatch({ type: 'loading' });
        }
    }

    return (
        <CharacterContainer>
            {isLoading ?
                <ClipSpinnerA />
                :
                <>
                    <AvatarContainerA url={avatarURL} />
                    <CharacterFieldsA character={character} server={server} />
                    <StyledButtonA
                        isDisabled={userData.verified}
                        text={userData.verified ? 'Verified' : 'Verify'}
                        handleClick={handleVerify}
                    />
                </>
            }
        </CharacterContainer>
    );
};

export default CharacterContainerA;
