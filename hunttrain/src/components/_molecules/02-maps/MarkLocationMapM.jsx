import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-self: center;
  overflow: auto;
`;

const Image = styled.img`
  min-width: 40rem;
  align-self: center;
  min-height: 40rem;
`;

const MarkLocationMapM = props => {
  // need a regex to break down cords into just numbers
  const { currentMark } = props;
  const { coords, zone } = currentMark;

  const coordinates = coords.replace(/[^0-9]/g, "");

  return (
    <Container>
      <Image
        src={`/resources/maps/${zone}/${zone}_${coordinates}.svg`}
      />
    </Container>
  );
};

export default MarkLocationMapM;