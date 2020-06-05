import React from 'react';
import styled from 'styled-components';

// possibly refactor as re-usable from header
const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 3.75rem;
    font-family: ${props => props.theme.ff};
    background: ${props => props.theme.darkestbg};
    box-shadow: 0 .063em .063em 0 rgba(0, 0, 0, .8);
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    font-size: .75rem;
`;

const Text = styled.div`
    margin-left: .625rem;
    color: ${props => props.theme.footerclr};
    letter-spacing: ${props => props.theme.ls};
    font-size: .688rem;
    display: flex
    align-self: center;
`;

const Link = styled.a`
    color: ${props => props.theme.footerclr};
    letter-spacing: ${props => props.theme.ls};
    font-family: ${props => props.theme.ff};
    font-size: .688rem;
    text-decoration: none;
    border-bottom: .063em solid ${props => props.theme.footerclr};
`;

const FooterA = () => {
    return (
        <Container>
            <Wrapper>
                <Link href='https://app.termly.io/document/privacy-policy/fa1bd745-8fea-4979-8531-f1a6498b5d16'>
                    Privacy Policy
                </Link>
                <Text>Created by Hattori Hanzo of Leviathan</Text>
            </Wrapper>
        </Container>
    );
};

export default FooterA;