import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (user) => {
  const response = await $authHost.post('api/user/registration', user);
  return jwt_decode(response.data.jwtToken);
};

export const login = async (email, password) => {
  const response = await $host.post('api/user/login', {
    Email: email,
    Password: password,
  });
  localStorage.setItem('jwtToken', response.data.jwtToken);
  return jwt_decode(response.data.jwtToken);
};
export const check = async () => {
  const response = await $authHost.get('api/user/auth');
  localStorage.setItem('jwtToken', response.data.token);
  return jwt_decode(response.data.token);
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
};

export const getUsers = async () => {
  const response = await $authHost.get('api/user/');
  return response.data;
}

export const getUser = async (id) => {
  const response = await $authHost.get(`api/user/${id}`);
  return response.data;
}

export const deleteUser = async (id) => {
  const deletedUser = await $authHost.delete(`api/user/${id}`);
  return deletedUser;
}

export const updateUser = async (user)=> {
  const updateUser = await $authHost.put('api/user', user);
  return updateUser.data;
}