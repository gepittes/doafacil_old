import axios from 'axios';
import * as types from './types';

export const obterSistemas = ({ dispatch, commit }) => {
    axios.get('http://localhost/v1/sistema')
        .then((response) => {
            const { data } = response.data;
            commit(types.OBTER_SISTEMAS, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerSistema = ({ dispatch, commit }, sistemaId) => {
    axios.delete(`http://localhost/v1/sistema/${sistemaId}`)
        .then(() => {
            commit(types.DELETE_SISTEMA, sistemaId);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarSistema = ({ dispatch, commit }, sistema) => axios.post('http://localhost/v1/sistema', sistema)
    .then((response) => {
        const { data } = response.data;
        commit(types.ACRESCENTAR_SISTEMA, data.data);
        dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarSistema = ({ dispatch, commit }, sistema) => axios.patch(`http://localhost/v1/sistema/${sistema.sistema_id}`, sistema)
    .then(() => {
        commit(types.ATUALIZAR_SISTEMA, sistema);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
