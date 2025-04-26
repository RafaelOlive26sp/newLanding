import api from './api'
import Cookies from 'js-cookie';


export const completeUser = async (data) => {
  console.log('dentro de completeUser ',data);
  const getToken =  Cookies.get('access_token');
  const response = await api.post('/api/v1/student',data,{
    headers:{
      Authorization: `Bearer ${getToken}`
    }
  });
  // console.log('response da api login',response.data);
  return response.data
}
