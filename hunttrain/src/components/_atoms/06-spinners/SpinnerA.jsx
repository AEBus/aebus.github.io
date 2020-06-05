import styled, { keyframes } from "styled-components";

/**
 * Spinner 
 */

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: flex;
  align-self: center;
  
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: .125rem solid grey;
  border-right: .125rem solid grey;
  border-bottom: .125rem solid grey;
  border-left: .25rem solid black;
  background: transparent;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

export default Spinner;