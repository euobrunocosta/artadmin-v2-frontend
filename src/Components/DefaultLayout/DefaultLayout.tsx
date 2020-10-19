import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Container } from 'semantic-ui-react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    background-color: #eee;
    font-family: Lato, sans-serif;
    min-height: 100vh;
  }
`

const PageContainer = styled(Container)`
  padding-bottom: 50px;
`

const DefaultLayout = (props: any) => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <PageContainer>{props.children}</PageContainer>
    </>
  )
}

export default DefaultLayout
