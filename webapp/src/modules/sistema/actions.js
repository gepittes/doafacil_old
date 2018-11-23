import axios from 'axios';
import * as types from './types';

export const obterSistemas = ({commit}) => {
    axios.get('http://localhost/v1/sistema')
        .then(response => {
            const data = response.data;
            commit(types.SET_SISTEMA, data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export const removerSistema = ({commit}, sistema_id) => {
    axios.delete('http://localhost/v1/sistema/' + sistema_id)
        .then(function () {
            commit(types.DELETE_SISTEMA, sistema_id);
        });
}

export const cadastrarSistema = ({commit}, sistema) => {
    return axios.post('http://localhost/v1/sistema', sistema)
        .then((response) => {
            const data = response.data;
            commit(types.SET_SISTEMA, data.data)
        });
};

export const atualizarSistema = ({commit}, sistema) => {
    return axios.patch('http://localhost/v1/sistema/' + sistema.sistema_id, sistema)
        .then(() => {
            commit(types.ATUALIZAR_SISTEMA, sistema)
        })
        .catch(error => {
            console.log(error);
        })
};
