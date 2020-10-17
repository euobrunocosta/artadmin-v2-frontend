import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { UseAuthProvider } from '../Hooks';
import { theme } from '../Styles';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <UseAuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UseAuthProvider>
  );
};

export default Providers;
