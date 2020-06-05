import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

// every test uses the base theme, if no custom theme is provided
import defaultTheme from './theme';

export const shallowWithTheme = (children, customTheme) => {
  const theme = customTheme || defaultTheme;
  return shallow(children, { context: theme });
};

export const mountWithTheme = (Component, customTheme) => {
  const theme = customTheme || defaultTheme;
  return mount(<ThemeProvider theme={theme}>{Component}</ThemeProvider>);
};
