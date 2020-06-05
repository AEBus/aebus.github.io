import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Container used for all <Guide*A /> components
 * Children will be the components within the indivudual -
 * GuideItem components.
 * Used in: all <Guide{*}A /> components
 */

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${props => props.theme.ff};
  color: ${props => (props.isTitle ? props.theme.red : props.theme.fntClr)};
  letter-spacing: ${props => props.theme.ls};
`;

const GuideItemContainerA = props => {
  const { children, isTitle } = props;
  return <Container isTitle={isTitle}>{children}</Container>;
};

export default GuideItemContainerA;

GuideItemContainerA.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  isTitle: PropTypes.bool
};
