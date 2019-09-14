import axios from 'axios';
import * as types from './types';
import { requisicaoAutorizada } from '../account/_helpers/requisicao-autorizada';

export const obterInstituicoes = ({ dispatch, commit }) => {
    requisicaoAutorizada.get('http://localhost/v1/instituicao').then((response) => {
        const { data } = response;
        commit(types.OBTER_INSTITUICOES, data.data);
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const removerInstituicao = ({ dispatch, commit }, instituicaoId) => {
    requisicaoAutorizada.delete(`http://localhost/v1/instituicao/${instituicaoId}`).then(() => {
        commit(types.DELETE_INSTITUICAO, instituicaoId);
        dispatch('alert/success', 'Instituicao excluido com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastrarInstituicao = ({ dispatch, commit }, instituicao) => axios.post('http://localhost/v1/instituicao', instituicao).then((response) => {
    const { data } = response;
    commit(types.ACRESCENTAR_INSTITUICAO, data.data);
    dispatch('alert/success', 'Instituicao cadastado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarInstituicao = ({ dispatch, commit }, instituicao) => requisicaoAutorizada.patch(`http://localhost/v1/instituicao/${instituicao.id}`, instituicao)
    .then(() => {
        commit(types.ATUALIZAR_INSTITUICAO, instituicao);
        dispatch('alert/success', 'Instituicao atualizado com sucesso!', { root: true });
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, { root: true });
    });

export const setDialog = ({ commit }, payload) => {
    commit(types.ESTADO_DIALOG, payload);
};

export const obterInstiUser = ({ commit, dispatch }, userId) => {
    requisicaoAutorizada.get(`http://localhost/v1/instituicao/user/buscar/${userId}`)
        .then((response) => {
            const { data } = response;
            commit(types.OBTER_INSTITUICOES, data.data);
        }).catch((error) => {
            dispatch('alert/error', error.response.data.error, { root: true });
        });
};

export const insitituicaoEditar = ({ commit }, payload) => {
    commit(types.INSTITUICAO_EDITAR, payload);
};

export const buscartInstituicao = ({ commit, dispatch }, instituicaoId) => {
    axios.get(`http://localhost/v1/instituicao/${instituicaoId}`)
        .then((resp) => {
            commit(types.INSTITUICAO_ENCONTRADA, resp.data.data[0]);
        })
        .catch((error) => {
            dispatch('alert/error', error, {
                root: true,
            });
        });
};
