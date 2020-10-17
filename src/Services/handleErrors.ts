import { toast } from 'react-toastify'
import { Messages } from '../Utils/Constants'

const handleErrors = (error: any) => {
  console.error(error)
  const message =
    error.response?.data?.messages?.[0] ?? Messages.genericError
  toast.error(message)
}

export default handleErrors