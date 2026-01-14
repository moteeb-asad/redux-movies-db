import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from './lib/chakra';

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
