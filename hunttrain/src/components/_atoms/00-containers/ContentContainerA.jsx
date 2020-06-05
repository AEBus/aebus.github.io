import React from "react";
import styled from "styled-components";

/**
 * Contains the content within the Splash page.
 * Used in: <SplashPageO />
 */

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  height: 18.75rem;
  margin: 0.938rem;
`;

const ContentContainerA = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default ContentContainerA;
