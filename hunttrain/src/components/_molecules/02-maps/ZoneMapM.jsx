import React, { useContext } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const API_HOST_URL = process.env.API_URL;

import { StateContext, DispatchContext } from '../../../App';

const Container = styled.div`
  display: flex;
  align-self: center;
  overflow: auto;
`;

const Image = styled.img`
  min-width: 40rem;
  align-self: center;
  min-height: 40rem;
`;

const Area = styled.area`
  cursor: pointer;
`;

const ZoneMapM = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { cardKey, mapZone, mapMark, markCoords, mapInstance } = state;

  const handleCoords = e => {
    e.preventDefault();

    const { target } = e;

    const splitString = target.title.split(' | ');

    const coords = splitString[0];
    const distance = parseFloat(splitString[1]);

    const markData = {
      coords,
      distance,
      instance: mapInstance + 1,
      mark: mapMark,
      zone: mapZone
    };

    const options = {
      cardKey: cardKey,
      instance: mapInstance,
      map: mapZone,
      mark: markData,
    };

    const axiosPost = async url => {
      await Axios.post(url, options)
        .catch(() => {
          dispatch({ type: 'cardError', error: 'There was an issue with this request. Please try again.' })
        })
    };

    axiosPost(`${API_HOST_URL}/api/scout/addMark`);
    dispatch({ type: 'modal' });
  };

  return (
    <Container>
      <Image // prettier-ignore
        src={`/resources/maps/${mapZone}_${mapMark}.svg`}
        useMap="#zone-map"
      />
      <map name="zone-map">
        {markCoords.map(location => {
          const rdmKey = Math.random()
            .toString(36)
            .substring(7);
          return (
            <Area
              alt="mark coordinate"
              coords={location.coords}
              key={rdmKey}
              onClick={handleCoords}
              shape="circle"
              title={`( ${location.x}, ${location.y} ) | ${location.distance}`}
            />
          );
        })}
      </map>
    </Container>
  );
};

export default ZoneMapM;
