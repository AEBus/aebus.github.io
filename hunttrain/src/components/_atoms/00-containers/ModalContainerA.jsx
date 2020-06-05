import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import ModalCloseHeaderA from '@A/01-headers/ModalCloseHeaderA';

/**
 * Container for the different modals.
 * Displays a Header with a close button. 
 * and then whatever children are passed in.
 * Used in: 
 * <LogoutNotificationA />>
 * <SiteGuideO />
 * <VerificationModalO />
 */

const Container = styled.div`
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    align-self: center;
    width: ${props => !props.carousel && '24rem'};
    height: ${props => props.notification && '31.250rem'};
    overflow: auto;
    flex-shrink: 1;
    radius: ${props => props.theme.brad};
    margin: .5rem;
    background: ${props => props.theme.cardbg};
    box-shadow: ${props => props.theme.bshad};

    @media only screen 
    and (min-device-width : 23.439rem) 
    and (max-device-width : 41.688rem) 
    and (orientation : portrait) { 
      max-height: 37.5rem;
      overflow: auto;
    }

    @media only screen 
    and (min-device-width : 25.875rem) 
    and (max-device-width : 46rem) 
    and (orientation : portrait) {
      max-height: 42.5rem;
      overflow: auto;
    }

    @media only screen 
    and (min-device-width : 20rem) 
    and (max-device-width : 35.5rem) 
    and (orientation : portrait) {
      max-height: 31.25rem;
      overflow: auto;
    }
`;

const ModalContainerA = props => {
  const { carousel, children, notification } = props;

  return (
    <Container carousel={carousel} notification={notification}>
      <ModalCloseHeaderA />
      {children}
    </Container>
  );
};

export default ModalContainerA;

ModalContainerA.propTypes = {
  carousel: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  notification: PropTypes.bool
};