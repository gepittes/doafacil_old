import axios from 'axios';
import * as types from './types';

export const obterMensagems = ({ dispatch, commit }) => {
    axios.get('http://localhost/v1/mensagem')
        .then((response) => {
            const data = response.data;
            commit(types.DEFINIR_MENSAGENS, data.data);
        })
        .catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const removerMensagem = ({ dispatch, commit }, mensagem_id) => {
    axios.delete(`http://localhost/v1/mensagem/${mensagem_id}`)
        .then(() => {
            commit(types.REMOVER_MENSAGEM, mensagem_id);
        }).catch((error) => {
            dispatch('alert/error', error.response.data.error, {
                root: true,
            });
        });
};

export const cadastrarMensagem = ({ dispatch, commit }, mensagem) => axios.post('http://localhost/v1/mensagem', mensagem)
    .then((response) => {
        const data = response.data;
        commit(types.ACRESCENTAR_MENSAGEM, data.data);
        dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });

export const atualizarMensagem = ({ dispatch, commit }, mensagem) => axios.patch(`http://localhost/v1/mensagem/${mensagem.mensagem_id}`, mensagem)
    .then(() => {
        commit(types.ATUALIZAR_MENSAGEM, mensagem);
    })
    .catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
