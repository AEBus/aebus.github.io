import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${props => props.theme.fntSz};
  font-family: ${props => props.theme.ff};
  color: ${props => props.theme.fntClr};
  text-align: justify;
  padding: 0;
  margin: 0;
`;

const TextContainerA = props => {
  const { text } = props;
  return <Paragraph>{text}</Paragraph>;
};

export default TextContainerA;
