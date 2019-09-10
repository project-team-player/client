import Cookies from 'universal-cookie';
import axios from 'axios';


export const getUserToken = () => {
  const cookies = new Cookies();
  const token = cookies.get('bearerToken');
  return token;
}

export const setUserToken = (jwtToken) => {
  const cookies = new Cookies();
  const token = jwtToken.split('JWT ')[1];
  cookies.set('bearerToken', token, { path: '/' });
}

export const removeUserToken = () => {
  const cookies = new Cookies();
  cookies.remove('bearerToken');
}

export const authenticateUser = () => {
  const token = getUserToken();
  return axios({ method: 'POST', url: `${process.env.REACT_APP_SERVER_URL}/authenticate`, headers: {authorization: `Bearer ${token}`}});
}