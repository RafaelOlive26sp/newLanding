import api from './api';


export const login = async ( credentials ) => {


  const response = await api.post('/api/login', credentials)
  // console.log('response da api login',response.data);

  return response.data
}

export const logout = async () => {
  const response = await api.post('/api/v1/logout')
  return response.data
}
