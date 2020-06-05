import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Container used to wrap content in <main> tag.
 * Used in: <ScouterPageO />
 */

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: inline-flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 3.75rem 0.313rem;
  flex-shrink: 0;
`;

const MainContainerA = props => {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default MainContainerA;

MainContainerA.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
