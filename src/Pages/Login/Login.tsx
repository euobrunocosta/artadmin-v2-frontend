import React, { useState, useEffect } from 'react'
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react'
import { Container, Box } from './styles'
import { useAuth } from '../../Hooks'
import api, { setAuth } from '../../Services/Api'
import { useHistory, useLocation } from 'react-router-dom'

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
      <Box>
        <Segment>
          <Header as="h2" textAlign="center">
            Art Admin
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
            <Button color="blue" fluid size="large">
              Log-in
            </Button>
          </Form>
          <Message>New here?</Message>
        </Segment>
      </Box>
    </Container>
  )
}

export default LoginPage
