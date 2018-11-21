import {authHeader} from '../_helpers';
import axios from 'axios';
import * as types from "../plataforma/types";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {

    return axios.post(`http://localhost/v1/autenticacao/login`, {
        email: email,
        password: password
    })
    //     .then(response => {
    //
    // })
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    // axios.get('http://localhost/v1/conta')
    //     .then(response => {
    //         const data = response.data;
    //         commit(types.SET_PLATAFORMA, data.data)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    return fetch(`http://localhost/v1/conta`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost/v1/conta`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost/v1/conta/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost/v1/conta/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost/v1/conta/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log(response)
    console.log(response.text())
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
