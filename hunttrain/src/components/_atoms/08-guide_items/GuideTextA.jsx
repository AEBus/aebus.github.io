import React from 'react';
import styled from 'styled-components';

import GuideItemContainerA from '@A/00-containers/GuideItemContainerA';

/**
 * Containers for basic text for a guide slide.
 * Can be used for intro (top) or notification (bot)
 */

// conditional for italics if notification
const Text = styled.p`
    display: flex;
    font-size: .813rem;
    text-align: justify;
    font-family: ${props => props.theme.ff};
    letter-spacing: ${props => props.theme.ls};
    color: ${props => props.notification && props.theme.red};
    font-weight: ${props => props.theme.lightfont};
    
`;

const GuideTextA = props => {
    const { notification, text } = props;

    return (
        <GuideItemContainerA>
            <Text notification={notification}>{text}</Text>
        </GuideItemContainerA>
    )
};

export default GuideTextA;