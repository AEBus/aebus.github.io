import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  display: ${props => props.theme.btnDisplay};
  background-color: ${props => props.inverted ? props.theme.darkBG : props.theme.btnBG};
  width: ${props => props.theme.btnW};
  height: ${props => props.theme.btnH};
  padding: ${props => props.theme.btnP};
  font-size: ${props => props.theme.btnFS};
  text-transform: ${props => props.theme.btnTT};
  letter-spacing: ${props => props.theme.btnLS};
  color: ${props => props.theme.btnColor};
  border: .125rem solid ${props => props.theme.btnColor};
  border-radius: ${props => props.theme.btnBorderRadius};
  text-align: ${props => props.theme.btnTA};
  text-decoration: ${props => props.theme.btnTD};
  cursor: ${props => props.theme.btnCursor};
  outline: ${props => props.theme.btnOutline};
  line-height: ${props => props.theme.btnLH};
  position: ${props => props.theme.btnPos};
  font-family: ${props => props.theme.ff};
  align-self: center;
  order: ${props => props.order};
  margin: .313rem;

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
    padding: .563rem 1.375rem;
  }
`;

const ThemedButtonA = props => {
  const { text, inverted, isDisabled, handleClick } = props;
  return <Button inverted={inverted} disabled={isDisabled} onClick={handleClick}>{text}</Button>;
};

export default withRouter(ThemedButtonA);
