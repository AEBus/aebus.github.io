import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  visibility: ${props => props.hidden && 'hidden'};
`;

const Notification = styled.p`
  align-self: center;
  text-align: center;
  color: ${props => props.theme.red};
  font-size: 1.25rem;
  font-family: ${props => props.theme.ff};
  letter-spacing: ${props => props.theme.ls};
`;

const FinalMarkNotificationA = props => {
  const { hidden } = props;
  return (
    <Container hidden={hidden}>
      <Notification>* Final Stop *</Notification>
    </Container>
  );
};

export default FinalMarkNotificationA;
