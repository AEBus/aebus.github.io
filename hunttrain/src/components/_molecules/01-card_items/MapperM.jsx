import React, { useContext } from 'react';
import styled from 'styled-components';

import { DispatchContext, StateContext } from '../../../App';

import StyledButtonA from '@A/02-buttons/StyledButtonA';
import RemoveButtonA from '@A/02-buttons/RemoveButtonA';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: ${props => props.theme.between};
  align-items: center;
  width: 5rem;
`;

const Coords = styled.p`
  font-size: 1rem;
  padding: .625rem 0;
  color: ${props => (props.active ? props.theme.green : props.theme.red)};
  font-family: ${props => props.theme.ff};
  text-align: ${props => props.theme.ta};

  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
  }
`;



const MapperM = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { instance, mark, zone } = props;
  const { zoneData, currentMark, scoutData, mapZone } = state;

  let markCoords = ' - ';
  let allowed = false;

  const handleClick = () => {
    const coordsArray = zoneData[zone].marks[mark].locations;
    dispatch({ type: 'clearNotifications' });
    dispatch({ type: 'map', zone, mark, instance, markCoords: coordsArray });
  };

  if (scoutData && scoutData[zone] && scoutData[zone][instance]) {
    const data = scoutData[zone][instance];
    const keys = Object.keys(data);
    keys.map(key => {
      const currentMarks = data[key];
      if (currentMarks.mark === mark) {
        markCoords = currentMarks.coords;
        allowed = true;
      }
    })
  }

  let currentMarkCoords = '';
  let currentMarkInstance = '';

  if (currentMark) {
    currentMarkCoords = currentMark.coords;
    currentMarkInstance = currentMark.instance - 1;
  }

  return (
    <Container>
      <Coords
        active={
          // prettier-ignore
          !!(currentMarkCoords === markCoords // prettier-ignore
            && currentMarkInstance === instance)
        }
      >
        {markCoords}
      </Coords>
      <RemoveButtonA {...props} allowed={allowed} />
      <StyledButtonA
        handleClick={handleClick}
        text={'Map'}
      />
    </Container >
  );
};

export default MapperM;
