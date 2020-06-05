import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  color: ${props => props.theme.cardbg};
  font-family: ${props => props.theme.ff};
  border: none;
  padding: .188rem 1rem;
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.theme.btnFS};
  border-radius: ${props => props.theme.brad};
  background-color: ${props => props.disabled ? '#893327' : props.theme.blue};
  text-decoration: none;
  margin: .313rem;

  &:visited,
  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    outline: none;
  }

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
    padding: .063rem .75rem;
  }
`;

const StyledButton = props => {
  const { isDisabled, handleClick, text } = props;

  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      {text}
    </Button>
  );
};

export default StyledButton;