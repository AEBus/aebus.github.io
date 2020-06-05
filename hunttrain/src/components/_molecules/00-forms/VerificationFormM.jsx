import React, { useContext } from 'react';
import styled from 'styled-components';

import FormNotificationA from '@A/03-notifications/FormNotificationA';
import ShareContainerA from '@A/00-containers/ShareContainerA';
import CharacterContainerA from '@A/00-containers/CharacterContainerA';

import { StateContext } from '../../../App';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    margin-bottom: .625rem;
`;

const VerifyContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    margin-bottom: .625rem;
`;

const VerificationFormM = () => {
    const state = useContext(StateContext);
    const { formError, formNotification, formSuccess, userData } = state;

    const token = userData.verificationToken;

    return (
        <Container>
            <VerifyContainer>
                <ShareContainerA text={'Copy Token'} verify={true} val={token} />
            </VerifyContainer>
            {userData.charName && <CharacterContainerA />}
            <FormNotificationA
                formNotification={formNotification}
                formError={formError}
                formSuccess={formSuccess}
            />
        </Container>

    );
};

export default VerificationFormM;