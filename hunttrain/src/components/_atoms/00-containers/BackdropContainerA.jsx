import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DispatchContext } from '../../../App';

/**
 * Contains the backdrop that goes behind any modal.
 * {children} will be <ModalContainerA> 
 * and which modal is displayed will be managed by <ModalManagerM>.
 */

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
  top: 0;
  left: 0;
`;

const BackdropContainerA = props => {
    const { children } = props;
    const dispatch = useContext(DispatchContext);

    /**
     * event - if the backdrop is clicked, dispatch is called to close modal.  
     */

    const handleBackdrop = event => {
        event.target === event.currentTarget && dispatch({ type: 'modal' });
    };

    return (
        <Backdrop onClick={handleBackdrop}>{children}</Backdrop>
    );
};

export default BackdropContainerA;


BackdropContainerA.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};