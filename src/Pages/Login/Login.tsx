import React, { useState, useEffect } from 'react'
import { Button, Form, Header, Segment, Grid, Image } from 'semantic-ui-react'
import { createGlobalStyle } from 'styled-components'
import { Container, Box } from './styles'
import { useAuth } from '../../Hooks'
import api, { setAuth } from '../../Services/Api'
import { useHistory, useLocation } from 'react-router-dom'
import logo from '../../Assets/logo-extended.svg'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    background-color: #2185d0;
    font-family: Lato, sans-serif;
    min-height: 100vh;
  }
`

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { userToken, saveUserData } = useAuth()
  const history = useHistory()
  const location = useLocation()

  const goHome = () => {
    history.push('/')
  }

  useEffect(() => {
    if (userToken) history.push(location.state?.from)
    // eslint-disable-next-line
  }, [userToken])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const campo = e.target.name
    const value = e.target.value
    campo === 'email' ? setEmail(value) : setPassword(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await api.post('/users/authenticate', { email, password })
    if (!response) return
    setAuth(`Bearer ${response.token}`)
    saveUserData(response)
    goHome()
  }

  return (
    <Container textAlign="center" verticalAlign="middle">
      <GlobalStyle />
      <Box>
        <Image src={logo} size="medium" centered />
        <Segment>
          <Header as="h2" textAlign="center">
            Sign In
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            <Button inverted color="blue" fluid size="large">
              Send
            </Button>
          </Form>
        </Segment>
      </Box>
    </Container>
  )
}

export default LoginPage
