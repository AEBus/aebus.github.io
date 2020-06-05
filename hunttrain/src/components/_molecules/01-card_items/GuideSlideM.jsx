import React from 'react';
import styled from 'styled-components';

import GuideListA from '@A/08-guide_items/GuideListA';
import GuideTextA from '@A/08-guide_items/GuideTextA';
import GuideTitleA from '@A/08-guide_items/GuideTitleA';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 100%
    height: 100%;
    font-weight: ${props => props.theme.lightfont};
`;


const Wrapper = styled.div`
    width: 60%;
    justify-content: center;
    align-self: center;
    margin-bottom: 3.125rem;
    overflow: auto;
`;

const GuideSlideM = props => {
    const { guide } = props;
    const { notification, ol, text, title, ul } = guide;
    return (
        <Container>
            <Wrapper>
                <GuideTitleA text={title} />
                {text && <GuideTextA text={text} />}
                {ol && <GuideListA ordered={true} list={ol} />}
                {ul && <GuideListA list={ul} />}
                {notification && <GuideTextA notification={true} text={notification} />}
            </Wrapper>
        </Container>
    );
};

export default GuideSlideM; 