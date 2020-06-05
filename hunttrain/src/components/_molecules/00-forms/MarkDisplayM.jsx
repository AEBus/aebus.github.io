import React from 'react';
import styled from 'styled-components';

import MarkInfoContainerA from '@A/00-containers/MarkInfoContainerA';
import FinalMarkNotificationA from '@A/03-notifications/FinalMarkNotificationA';

const MarkContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  background-color: ${props => props.theme.darkestbg};
  border-radius: ${props => props.theme.brad};
  justify-content: ${props => props.theme.between};
  border-top: .125rem solid #222;
  border-left: .063rem solid #222;
  border-right: .063rem solid #222;
  border-bottom: .063rem solid #242424;
  align-items: center;
  margin: ${props => props.theme.margin};
`;

const MarkDisplayM = props => {
  const { currentMark, currentStop, totalStops } = props;
  const items = ['zone', 'instance', 'coords'];

  return (
    <MarkContainer>
      <FinalMarkNotificationA
        hidden={((currentStop !== totalStops) || (currentMark.instance === ' - ')) && true}
      />
      <InfoContainer>
        {items.map(item => {
          const rdmKey = Math.random()
            .toString(36)
            .substring(7);
          return <MarkInfoContainerA data={currentMark[item]} label={item} key={rdmKey} />;
        })}
      </InfoContainer>
    </MarkContainer>
  );
};

export default MarkDisplayM;
