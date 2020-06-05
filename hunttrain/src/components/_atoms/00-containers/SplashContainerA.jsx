import React from "react";
import styled from "styled-components";

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/resources/images/hunt.jpg);
  padding-bottom: 3.75rem;
`;

const SplashContainerA = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default SplashContainerA;
