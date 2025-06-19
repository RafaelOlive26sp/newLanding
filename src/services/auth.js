import api from './api';
import Cookies from 'js-cookie';



export const login = async (credentials) => {
  const response = await api.post('/api/login', credentials,{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  return response.data
}

export const logout = async () => {
  const token = Cookies.get('access_token')
  const response = await api.post('/api/v1/logout', null, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
  return response.data
}
