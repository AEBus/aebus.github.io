import React from 'react';
import styled from 'styled-components';

import RowContainerA from '@A/00-containers/RowContainerA';
import InstanceContainerA from '@A/00-containers/InstanceContainerA';
import ZoneMarkContainerA from '@A/00-containers/ZoneMarkContainerA';

const Zone = styled.h3`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.fntClr};
  font-family: ${props => props.theme.ff};
  letter-spacing: ${props => props.theme.ls};

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
  }
`;

const Instance = styled.h3`
  align-self: center;
  padding: 0;
  margin: 0;
  color: ${props => props.theme.fntClr};
  font-family: ${props => props.theme.ff};
  text-align: ${props => props.theme.ta};

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
`;

const CardHeaderM = props => {
  const { zone } = props;
  const instances = [1, 2, 3];
  return (
    <RowContainerA>
      <ZoneMarkContainerA>
        <Zone>{zone}</Zone>
      </ZoneMarkContainerA>
      <InstanceContainerA>
        {instances.map(instance => {
          const rdmKey = Math.random()
            .toString(36)
            .substring(7);
          return (
            <Container key={rdmKey}>
              <Instance key={rdmKey}>{instance}</Instance>
            </Container>
          );
        })}
      </InstanceContainerA>
    </RowContainerA>
  );
};

export default CardHeaderM;
