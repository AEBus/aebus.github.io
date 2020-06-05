import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Container for character avatar in Navbar header.
 * Used in: <NavButtonContainerA />
 */

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-right: .5rem;
`;

const Avatar = styled.img`
    display: flex;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    align-self: center;
`;

const AvatarContainerA = props => {
    const { url } = props;
    return (
        <AvatarContainer>
            <Avatar src={url} />
        </AvatarContainer>
    );
};

export default AvatarContainerA;

AvatarContainerA.propTypes = {
    url: PropTypes.string
};