import api from './api'
import Cookies from 'js-cookie';


export const completeUser = async (data) => {
  const getToken = Cookies.get('access_token');
  const response = await api.post('/api/v1/student', data, {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  });
  // console.log('response da api login',response.data);
  return response.data
}
export const registerUser = async (data) => {
  // console.log('dentro de registerUser ',data.value);
  const response = await api.post('/api/v1/register', data.value);
  // console.log('response da api login',response.data);
  return response.data
}
