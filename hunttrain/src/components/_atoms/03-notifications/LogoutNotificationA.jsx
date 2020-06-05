import React from 'react';
import styled from 'styled-components';

import ModalContainerA from '@A/00-containers/ModalContainerA';

const Notification = styled.div`
    display: flex;
    align-self: center;
    text-align: center;
    font-family: ${props => props.theme.ff};
    font-size: ${props => props.theme.fntSz};
    color: ${props => props.theme.green};
`;

const LogoutNotificationA = () => {
    return (
        <ModalContainerA notification={true}>
            <Notification>
                You have been logged out.
            </Notification>
        </ModalContainerA>
    );
};

export default LogoutNotificationA;