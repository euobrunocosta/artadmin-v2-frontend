import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'
import Providers from './Providers/Providers'
import Routes from './Routes/Routes'

const App = () => {
  return (
    <Providers>
      <Routes />
      <ToastContainer hideProgressBar newestOnTop transition={Slide} />
    </Providers>
  )
}

export default App
