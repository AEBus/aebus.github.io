import styled from 'styled-components';

/**
 * Container for a button.
 * Used in: <TrainCardM />
 */

const ButtonContainerA = styled.div`
  display: flex;
  flex-flow: ${props => props.column ? 'column' : 'row'};
  justify-content: space-around;
  align-content: center;
  margin: .313rem;
`;

export default ButtonContainerA;