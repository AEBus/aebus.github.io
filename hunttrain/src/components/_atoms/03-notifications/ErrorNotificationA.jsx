import React from 'react';
import styled from 'styled-components';

const Error = styled.p`
    color: red;
    text-align: center;
    font-family: ${props => props.theme.ff};
    line-spacing: .113rem;
    visibility: ${props => props.error ? 'visible' : 'hidden'};
`;

const ErrorNotificationA = props => {
    const { error } = props;
    return (
        <Error error={error}>
            Invalid key.
        </Error>
    );
};

export default ErrorNotificationA;