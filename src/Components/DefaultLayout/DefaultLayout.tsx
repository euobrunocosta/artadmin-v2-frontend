import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  padding-bottom: 50px;
`;

const DefaultLayout = (props: any) => {
  return (
    <>
      <Navbar />
      <PageContainer>{props.children}</PageContainer>
    </>
  );
};

export default DefaultLayout;
