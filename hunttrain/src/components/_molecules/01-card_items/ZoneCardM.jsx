import React from 'react';
import styled from 'styled-components';

import CardHeaderM from '@M/01-card_items/CardHeaderM';
import CardRowM from '@M/01-card_items/CardRowM';
import CardNotificationA from '@A/03-notifications/CardNotificationA';

const CardContainer = styled.div`
  background-color: ${props => props.theme.cardbg};
  border-radius: ${props => props.theme.brad};
  box-shadow: ${props => props.theme.bshad};
  margin: ${props => props.theme.margin};
  display: flex;
  justify-content: center;
  align-content: center;
  padding: ${props => props.theme.pad};
`;

const Card = styled.div`
  display: flex;
  flex-flow: column;
  margin: ${props => props.theme.margin};
`;

const ZoneCardM = props => {
  const { zone, marks } = props;
  const marksArray = Object.keys(marks);
  return (
    <CardContainer>
      <Card>
        <CardHeaderM zone={zone} />
        {marksArray.map(mark => {
          const rdmKey = Math.random()
            .toString(36)
            .substring(7);
          return <CardRowM key={rdmKey} mark={mark} zone={zone} />;
        })}
        <CardNotificationA zone={zone} />
      </Card>
    </CardContainer>
  );
};

export default ZoneCardM;
