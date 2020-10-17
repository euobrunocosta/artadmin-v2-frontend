import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { ToastContainer, Slide } from 'react-toastify'

import Providers from './Providers/Providers'
import Routes from './Routes/Routes'

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

const App = () => {
  return (
    <Providers>
      <GlobalStyle />
      <Routes />
      <ToastContainer hideProgressBar newestOnTop transition={Slide} />
    </Providers>
  )
}

export default App
