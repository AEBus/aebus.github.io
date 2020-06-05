import React, { useContext } from 'react';
import styled from 'styled-components';

import initialState from 'Utils/initialState';

import { DispatchContext, StateContext } from '../../../App';

import RouteContainerA from '@A/00-containers/RouteContainerA';
import ButtonContainerA from '@A/00-containers/ButtonContainerA';
import StyledButtonA from '@A/02-buttons/StyledButtonA';
import DiscordButtonA from '@A/02-buttons/DiscordButtonA';
import RowContainerA from '@A/00-containers/RowContainerA';
import WorldDropDownM from '@M/00-forms/WorldDropDownM';

const Container = styled.div`
  background-color: ${props => props.theme.cardbg};
  border-radius: ${props => props.theme.brad};
  box-shadow: ${props => props.theme.bshad};
  margin: ${props => props.theme.margin};
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  alig-self: center;
  padding: ${props => props.theme.pad};
`;

const StartButton = styled.button`
  color: ${props => props.theme.cardbg};
  font-family: ${props => props.theme.ff};
  border: none;
  padding: .188rem 1rem;
  outline: none;
  font-size: ${props => props.theme.btnFS};
  border-radius: ${props => props.theme.brad};
  background-color: ${props => props.theme.blue};
  text-decoration: none;
  cursor: pointer;

  &:visited,
  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    outline: none;
  }
  @media (max-width: 25.938rem) {
    font-size: ${props => props.theme.mfs};
    padding: .063em .75rem;
  }
`;

const TrainCardM = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { currentMark, scoutedZoneKeys, scoutData, zoneKeys } = state;

  const handleRouteCreation = () => {
    const routeData = [];

    // this is used to re-arrange array to keep them in order.
    const newZoneKeys = zoneKeys.filter(zone => {
      return scoutedZoneKeys.includes(zone);
    })

    newZoneKeys.map(zone => {
      let lastDistance;

      for (let i = 0; i <= 2; i++) {
        const instanceData = [];
        // if there is scoutData for this instance, proceed.
        if (scoutData[zone][i]) {
          const markKeys = Object.keys(scoutData[zone][i]);
          markKeys.map(key => {
            const keyData = scoutData[zone][i][key];
            if (keyData.distance < lastDistance) {
              instanceData.unshift(keyData);
            } else {
              instanceData.push(keyData);
            }
            lastDistance = keyData.distance;
          });
        }
        routeData.push(...instanceData)
      }
    });

    const totalStops = routeData.length - 1;

    const markData = routeData[0];

    if (markData) dispatch({
      type: 'route',
      route: routeData,
      mark: markData,
      count: totalStops
    });
  };

  return (
    <Container>
      <RouteContainerA />
      <RowContainerA align={'center'}>
        <ButtonContainerA>
          <StyledButtonA
            handleClick={() => dispatch({ type: 'modalSwitch', modalType: 'shared' })}
            text={'Share'} />
          <StyledButtonA
            isDisabled={currentMark.coords === ' - '}
            handleClick={() => dispatch({ type: 'modalSwitch', modalType: 'location' })}
            text={'Map'}
          />
        </ButtonContainerA>
      </RowContainerA>
      <RowContainerA align={'center'}>
        <ButtonContainerA>
          <StartButton
            onClick={handleRouteCreation}
          >
            {currentMark === initialState.currentMark ? 'Start Train' : 'Restart Train'}
          </StartButton>
        </ButtonContainerA>
      </RowContainerA>
      <RowContainerA align={'space-evenly'}>
        <WorldDropDownM />
        <DiscordButtonA />
      </RowContainerA>
    </Container>
  );
};

export default TrainCardM;
