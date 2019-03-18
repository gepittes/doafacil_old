import axios from 'axios';
import { obterCabecalhoComToken } from './jwt';

const cabecalho = obterCabecalhoComToken();

function post(urlString, data, config) {
    const mergedConfig = Object.assign(cabecalho, config);
    return axios.post(urlString, data, mergedConfig);
}

function get(urlString, config) {
    const mergedConfig = Object.assign(cabecalho, config);
    return axios.get(urlString, mergedConfig);
}

function remove(urlString, config) {
    const mergedConfig = Object.assign(cabecalho, config);
    return axios.delete(urlString, mergedConfig);
}

function put(urlString, data, config) {
    const mergedConfig = Object.assign(cabecalho, config);
    return axios.put(urlString, data, mergedConfig);
}

function patch(urlString, data, config) {
    const mergedConfig = Object.assign(cabecalho, config);
    return axios.patch(urlString, data, mergedConfig);
}

export const requisicaoAutorizada = {
    post,
    get,
    delete: remove,
    put,
    patch,
};
