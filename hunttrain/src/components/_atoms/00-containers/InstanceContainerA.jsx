import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Contains the content for each instance in ZoneCard.
 * Used in: <CardHeaderM /> and <CardRowM />
 */

const Container = styled.div`
  display: flex;
  flex-flow: ${props => (props.column ? 'column' : 'row')};
  justify-content: ${props => props.theme.between};
`;

const InstanceContainerA = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default InstanceContainerA;

InstanceContainerA.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};