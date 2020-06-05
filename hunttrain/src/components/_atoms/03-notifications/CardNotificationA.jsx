import React, { useContext } from 'react';
import styled from 'styled-components';

import { StateContext } from '../../../App';

const Notification = styled.p`
    display: flex;
    align-self: center;
    font-size: .813rem;
    color: ${props => props.theme.red};
    visibility: ${props => props.isHidden && 'hidden'};
`;

const Container = styled.div`
    display: flex;
    margin: .938rem 0;
    justify-content: center;
`;

const CardNotificationA = props => {
    const state = useContext(StateContext);
    const { zone } = props;
    const { cardError, cardNotification, mapZone } = state;
    // need state for cardError and cardNotification.
    // cardNotification can be error from selecting a location, or error from removing button.
    const handleHidden = () => {
        if (mapZone !== zone) return true;
        if (cardError) return false;
        if (cardNotification) return false;
        return true;
    };
    const isHidden = handleHidden();

    return (
        <Container>
            <Notification isHidden={isHidden}>
                {cardNotification}
            </Notification>
        </Container>
    );
};

export default CardNotificationA;