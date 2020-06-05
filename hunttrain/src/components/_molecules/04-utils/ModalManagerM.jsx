import React, { useContext } from 'react';
import { StateContext } from '../../../App';

import ShareContainerA from '@A/00-containers/ShareContainerA';
import MarkLocationMapM from '@M/02-maps/MarkLocationMapM';
import LogoutNotificationA from '@A/03-notifications/LogoutNotificationA';
import SiteGuideO from '@O/01-modals/SiteGuideO';
import VerificationModalO from '@O/01-modals/VerificationModalO';
import ZoneMapM from '@M/02-maps/ZoneMapM';


const ModalManagerM = props => {
    const state = useContext(StateContext);
    const { cardKey, currentMark, mapZone, mapMark, modalType } = state;

    switch (modalType) {
        case 'shared': {
            return <ShareContainerA text={'Copy'} val={`hunt-conductor.com/${cardKey}`} />
        };
        case 'location': {
            return <MarkLocationMapM currentMark={currentMark} />
        }
        case 'map': {
            return <ZoneMapM mapZone={mapZone} mapMark={mapMark} />
        }
        case 'logout': {
            return <LogoutNotificationA />
        }
        case 'verification': {
            return <VerificationModalO />
        }
        case 'guide': {
            return <SiteGuideO />
        }
        default: {
            return null;
        }
    }
};

export default ModalManagerM;