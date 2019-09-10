import axios from 'axios';
import * as types from './types';

export const obterPontoDeDoacoes = ({ dispatch, commit }) => {
    axios.get('http://localhost/v1/ponto').then((response) => {
        const { data } = response;
        commit(types.OBTER_PONTO_DE_DOACOES, data.data);
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const removerPontoDeDoacao = ({ dispatch, commit }, pontoId) => {
    axios.delete(`http://localhost/v1/ponto/${pontoId}`).then(() => {
        commit(types.DELETE_PONTO_DE_DOACAO, pontoId);
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastraPontoDeDoacao = ({ dispatch, commit }, ponto) => axios.post('http://localhost/v1/ponto', ponto).then((response) => {
    const { data } = response;
    commit(types.ACRESCENTAR_PONTO_DE_DOACAO, data.data);
    dispatch('alert/success', 'Cadastro realizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarPontoDeDoacao = ({ dispatch, commit }, ponto) => axios.patch(`http://localhost/v1/ponto/${ponto.pontoId}`, ponto).then(() => {
    commit(types.ATUALIZAR_PONTO_DE_DOACAO, ponto);
    dispatch('alert/success', 'Ponto de doação atualizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});
