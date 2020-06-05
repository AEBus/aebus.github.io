import React from 'react';
import styled from 'styled-components';

import { verificationSteps } from 'Utils/verification';

/**
 * Guide containing verification steps.
 * Displays:
 * <div>
 *  > Header <
 *  > List <
 * <div>
 * Used in: 
 */

const Container = styled.div`
    color: ${props => props.theme.fntClr};
    font-family: ${props => props.theme.ff};
    letter-spacing: ${props => props.theme.ls};
    display: inline-flex;
    flex-flow: column;
`;

const Header = styled.h3`
    display: flex;
    align-self: center;
`;

const List = styled.ol`
    display: flex;
    flex-flow: column;
    align-self: center;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    margin-bottom: .5rem;
    font-size: .813rem;
`;

const VerificationGuideA = () => {
    return (
        <Container>
            <Header>Verification Steps</Header>
            <List>
                {verificationSteps.map(step => {
                    const rdmKey = Math.random()
                        .toString(36)
                        .substring(7);
                    return (
                        <ListItem key={rdmKey}>
                            {step}
                        </ListItem>
                    );
                })}
            </List>
        </Container>
    );
};

export default VerificationGuideA;