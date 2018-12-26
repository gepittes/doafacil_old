import { authHeader } from '../_helpers';
import axios from 'axios';

function handleResponse(response) {
  if (response.data.status === 401) {
    // auto logout if 401 response returned from api
    this.logout();
    window.location.reload(true);
  }
  const error = (response.data && response.data.error) || response.data.status;

  if (error != null) {
    return Promise.reject(error);
  }
  return response.data.data;
}

function login(email, password) {
  return axios.post('http://localhost/v1/autenticacao/login', {
    email,
    password,
  });
}

function logout() {
  console.log('logout');
  localStorage.removeItem('user');
}

function register(user) {
  return axios.post('http://localhost/v1/conta', JSON.parse(JSON.stringify(user)));
  // return fetch('http://localhost/v1/conta', requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch('http://localhost/v1/conta', requestOptions).then(handleResponse);
}


function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`http://localhost/v1/conta/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`http://localhost/v1/conta/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`http://localhost/v1/conta/${id}`, requestOptions).then(handleResponse);
}


export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  remove,
};
