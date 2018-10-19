import axios from 'axios';
import * as types from './types';

export const obterPlataformas = ({commit}) => {
    axios.get('http://localhost/v1/plataforma')
        .then(response => {
            const data = response.data;
            commit(types.SET_PLATAFORMA, data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export const removerPlataforma = ({commit}, plataforma_id) => {
    axios.delete('http://localhost/v1/plataforma/' + plataforma_id)
        .then(function () {
            commit(types.DELETE_PLATAFORMA, plataforma_id);
        });
}

export const cadastrarPlataforma = ({commit}, plataforma) => {
    return axios.post('http://localhost/v1/plataforma', plataforma)
        .then((response) => {
            const data = response.data;
            commit(types.SET_PLATAFORMA, data.data)
        });
};

export const atualizarPlataforma = ({commit}, plataforma) => {
    return axios.patch('http://localhost/v1/plataforma/' + plataforma.plataforma_id, plataforma)
        .then(() => {
            commit(types.ATUALIZAR_PLATAFORMA, plataforma)
        })
        .catch(error => {
            console.log(error);
        })
};
