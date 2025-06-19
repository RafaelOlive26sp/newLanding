import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apifit-production.up.railway.app/',
  // baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Application-Source': 'client',
  },
});
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default api;
