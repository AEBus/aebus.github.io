import React from 'react';
import styled from 'styled-components';

import GuideItemContainerA from '@A/00-containers/GuideItemContainerA';

/**
 * Container for the title of a guide slide
 * Used at top of guide slide.
 */

const Title = styled.h3`
    display: flex;
    align-self: center;
`;

const GuideTitleA = props => {
    const { text } = props;
    return (
        <GuideItemContainerA isTitle={true}>
            <Title>{text}</Title>
        </GuideItemContainerA>
    )
};

export default GuideTitleA;