import { render as rtlRender } from '@testing-library/react';
import { ReactElement, JSXElementConstructor } from 'react';

const customRender = (ui: ReactElement<any, string | JSXElementConstructor<any>>, { width = 1024, ...options } = {}) => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: query.includes(`(min-width: ${width}px)`),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

  return rtlRender(ui, { ...options });
};

export default customRender;
