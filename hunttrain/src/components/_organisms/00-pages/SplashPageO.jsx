import React, { useContext } from 'react';
import Axios from 'axios';

import { DispatchContext, StateContext } from '../../../App';

import SplashContainerA from '@A/00-containers/SplashContainerA';
import ContentContainerA from '@A/00-containers/ContentContainerA';

import SplashHeaderA from '@A/01-headers/SplashHeaderA';
import TextContainerA from '@A/00-containers/TextContainerA';
import ThemedButtonA from '@A/02-buttons/ThemedButtonA';

import ModalManagerM from '@M/04-utils/ModalManagerM';
import BackdropContainerA from '@A/00-containers/BackdropContainerA';

const paragraph = '';

const API_HOST_URL = process.env.API_URL;

const SplashPageO = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { showModal } = state;

  // Click handler, when clicked creates a new key in FB.
  const handleNew = () => {
    Axios.post(`${API_HOST_URL}/api/scout/new`)
      .then(res => {
        let path = res.data.uniqueId;
        props.history.push(path);
        dispatch({ type: 'updateKey', cardKey: path });
      });
  };

  return (
    <SplashContainerA className="darken">
      <ContentContainerA>
        <SplashHeaderA>Welcome to Hunt Conductor</SplashHeaderA>
        <TextContainerA text={paragraph} />
        <ThemedButtonA // prettier-ignore
          handleClick={handleNew}
          inverted={false}
          text="Start Scouting"
        />
        {showModal && (
          <BackdropContainerA>
            <ModalManagerM history={props.history} />
          </BackdropContainerA>
        )}
      </ContentContainerA>
    </SplashContainerA>
  );
};

export default SplashPageO;
