import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow; row;
    justify-content: ${props => props.align ? props.align : props.theme.between};
    padding-bottom: ${props => props.nopad ? '0' : '.313rem'};
    border-bottom: .063rem solid ${props => props.theme.darkestbg};
`;

const RowContainerA = props => {
  const { center, children } = props;
  return <Container {...props}>{children}</Container>;
};

export default RowContainerA;
