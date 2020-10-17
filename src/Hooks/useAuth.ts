import { useState, useEffect } from 'react'
import constate from 'constate'
import { setAuth } from '../Services/Api'

const safeKey = '@USER/data'
const registrationKey = '@USER/registration'
const tokenKey = '@USER/token'

function useAuthContext() {
  const [user, setUser] = useState<TUser>()
  const [userToken, setUserToken] = useState('')
  const [registration, setRegistration] = useState('')

  useEffect(() => {
    const getUserData = () => {
      const rawData = localStorage.getItem(safeKey)
      if (!rawData) return
  
      const data = JSON.parse(rawData)
      setUser(data)
    }
  
    const getToken = () => {
      const token = localStorage.getItem(tokenKey)
      if (!token) return
  
      setUserToken(token)
      setAuth(`Bearer ${token}`)
    }
  
    const getRegistration = () => {
      const registration = localStorage.getItem(registrationKey)
      if (!registration) return
  
      setRegistration(registration)
    }
    
    getUserData()
    getToken()
    getRegistration()
  }, [])

  const saveUserData = (data: TUser) => {
    const token = data.token
    setUserToken(token)
    delete data.token
    setUser(data)

    localStorage.setItem(safeKey, JSON.stringify(data))
    localStorage.setItem(tokenKey, token)
  }

  const signOut = () => {
    setUser(undefined)
    setUserToken('')
    localStorage.clear()
  }

  const saveRegistration = (data: any) => {
    setRegistration(data)
    localStorage.setItem(registrationKey, data)
  }

  return { user, userToken, registration, saveUserData, saveRegistration, signOut }
}

const [UseAuthProvider, useAuth] = constate(useAuthContext)

export { UseAuthProvider, useAuth }
