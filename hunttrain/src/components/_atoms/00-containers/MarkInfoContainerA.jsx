import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Component that will display:
 * Zone/Instance/Coords with their data
 * within the TrainCard at the top of ScoutPageO
 * Used in: <MarkDisplayM />
 */

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  padding: ${props => props.theme.pad};
  flex-grow: 2;
`;

/**
 * Displays a label for zone,instance, or coords.
 */
const Label = styled.p`
  text-align: ${props => props.theme.ta};
  letter-spacing: ${props => props.theme.ls};
  font-family: ${props => props.theme.ff};
  color: ${props => props.theme.fntClr};

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
  }
`;

/**
 * Displays either zone, instance, or coord data.
 */
const Info = styled.p`
  font-family: ${props => props.theme.ff};
  letter-spacing: ${props => props.theme.ls};
  font-size: ${props => props.theme.fntSz};
  border-bottom: .063rem solid ${props => props.theme.darkestbg};
  text-align: ${props => props.theme.ta};
  padding-bottom: .188rem;
  color: ${props => props.theme.green};

  @media (max-width: 25.875rem) {
    font-size: ${props => props.theme.mfs};
  }
`;

const MarkInfoContainerA = props => {
  const { data, label } = props;

  return (
    <Container>
      <Info>{data}</Info>
      <Label>{label}</Label>
    </Container>
  );
};

export default MarkInfoContainerA;

MarkInfoContainerA.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  label: PropTypes.string.isRequired
};