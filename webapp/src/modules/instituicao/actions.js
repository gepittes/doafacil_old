import axios from 'axios';
import * as types from './types';
import { requisicaoAutorizada } from '../account/_helpers/requisicao-autorizada';

export const obterInstituicoes = ({ dispatch, commit }) => {
    console.log('getActin')
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
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastrarInstituicao = ({ dispatch, commit }, instituicao) => axios.post('http://localhost/v1/instituicao', instituicao).then((response) => {
    console.log('postAction')
    const { data } = response;
    commit(types.ACRESCENTAR_INSTITUICAO, data.data);
    dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarInstituicao = ({ dispatch, commit }, instituicao) => requisicaoAutorizada.patch(`http://localhost/v1/instituicao/${instituicao.id}`, instituicao).then(() => {
    commit(types.ATUALIZAR_INSTITUICAO, instituicao);
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});
