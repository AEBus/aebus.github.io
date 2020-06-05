import React from 'react';
import styled from 'styled-components';

import GuideItemContainerA from '@A/00-containers/GuideItemContainerA';

/**
 * Container that displays either the ol or ul from a guide section.
 * If the guide slide has an ordered list, it will create a OL, else UL
 */

const OL = styled.ol`
    display: inline-flex;
    flex-flow: column;
    align-self: center;

`;

const UL = styled.ul`
    display: inline-flex;
    flex-flow: column;
    align-self: center;

`;
// refactor to use here annd VerificationGuideA
const Item = styled.li`
    margin-bottom: .5rem;
    font-size: .813rem;
    text-align: justify;
`;

const GuideListA = props => {
    const { list, ordered } = props;

    return (
        <GuideItemContainerA>
            {ordered ?
                <OL>
                    {list.map(item => {
                        const rdmKey = Math.random()
                            .toString(36)
                            .substring(7);
                        return <Item key={rdmKey}>{item}</Item>
                    })}
                </OL>
                :
                <UL>
                    {list.map(item => {
                        const rdmKey = Math.random()
                            .toString(36)
                            .substring(7);
                        return <Item key={rdmKey}>{item}</Item>
                    })}
                </UL>
            }
        </GuideItemContainerA>
    )
};

export default GuideListA;