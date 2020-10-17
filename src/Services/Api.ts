import axios from 'axios'
import handleErrors from './handleErrors'

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const setAuth = (token: string) =>
  (apiInstance.defaults.headers.Authorization = token)

const api = {
  async post(route: string, data: object) {
    try {
      const response = await apiInstance.post(route, data)
      return response.data
    }
    catch (error) { handleErrors(error) }
  },

  async get(route: string, params?: any) {
    try {
      const response = await apiInstance.get(route, { params })
      return response.data
    }
    catch (error) { handleErrors(error) }
  },

  async put(route: string, data: any) {
    try {
      const response = await apiInstance.put(route, data)
      return response.data
    }
    catch (error) { handleErrors(error) }
  },

  async delete(route: string, params?: any) {
    try {
      const response = await apiInstance.delete(route, { params })
      return response.data
    }
    catch (error) { handleErrors(error) }
  },

  async deleteMany(route: string, data: object) {
    try {
      const response = await apiInstance.delete(route, data)
      return response.data
    }
    catch (error) { handleErrors(error) }
  },
}

export default api
