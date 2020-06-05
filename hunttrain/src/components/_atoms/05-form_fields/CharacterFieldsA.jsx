import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    color: ${props => props.theme.fntClr};
    font-size: .813rem;
    justify-content: space-between;
    letter-spacing: ${props => props.theme.ls};
`;

const Info = styled.div`

`;

const CharacterFieldsA = props => {
    const { character, server } = props;
    return (
        <Container>
            <Info>{character}</Info>
            <Info>{server}</Info>
        </Container>
    );
};

export default CharacterFieldsA;
