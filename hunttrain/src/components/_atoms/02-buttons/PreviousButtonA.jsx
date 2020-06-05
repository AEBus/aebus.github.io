import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  visibility: ${props => props.hidden && 'hidden'};
`;

const Button = styled.button`
  align-self: flex-end;
  font-size: 1.875rem;
  padding-bottom: 1.25rem;
  cursor: pointer;
  outline: none;
  color: ${props => props.theme.fntClr};
  background-color: ${props => props.theme.cardbg};
  border: none;
  text-decoration: none;

  &:visited,
  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    outline: none;
  }
`;

const PreviousButtonA = props => {
  const { handleClick, hidden } = props;

  return (
    <Container hidden={hidden}>
      <Button onClick={handleClick}>&lt;</Button>
    </Container>
  );
};

export default PreviousButtonA;
