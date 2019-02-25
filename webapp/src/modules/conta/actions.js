import axios from 'axios';
import * as types from './types';

export const obterContas = ({ dispatch, commit }) => {
    axios.get('http://localhost/v1/conta')
        .then((response) => {
            const data = response.data;
            commit(types.OBTER_CONTAS, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerConta = ({ dispatch, commit }, usuario_id) => {
    axios.delete(`http://localhost/v1/conta/${usuario_id}`)
        .then(() => {
            commit(types.DELETE_CONTA, usuario_id);
        }).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarConta = ({ dispatch, commit }, conta) => axios.post('http://localhost/v1/conta', conta)
    .then((response) => {
        const data = response.data;
        commit(types.ACRESCENTAR_CONTA, data.data);
        dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarConta = ({ dispatch, commit }, conta) => axios.patch(`http://localhost/v1/conta/${conta.usuario_id}`, conta)
    .then(() => {
        commit(types.ATUALIZAR_CONTA, conta);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
