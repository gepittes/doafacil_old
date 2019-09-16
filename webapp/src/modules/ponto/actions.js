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

export const removerPonto = ({ dispatch, commit }, pontoId) => {
    axios.delete(`http://localhost/v1/ponto/${pontoId}`).then(() => {
        commit(types.DELETE_PONTO_DE_DOACAO, pontoId);
        dispatch('alert/success', 'Ponto de Acesso excluido com sucesso!', { root: true });
    }).catch(() => {
        dispatch('alert/error', 'Desculpe, Não encontramos este ponto', { root: true });
    });
};

export const getPontoByInst = ({ dispatch, commit }, instituicaoId) => {
    axios.get(`http://localhost/v1/pontoByInst/${instituicaoId}`).then((response) => {
        const { data } = response;
        commit(types.GET_PONTO_BY_INSTITUICAO, data.data);
    }).catch((error) => {
        dispatch('alert/error', error.response.data.error, {
            root: true,
        });
    });
};

export const cadastraPontoDeDoacao = ({ dispatch, commit }, ponto) => axios.post('http://localhost/v1/ponto', ponto).then((response) => {
    const { data } = response;
    commit(types.ACRESCENTAR_PONTO_DE_DOACAO, data.data);
    dispatch('alert/success', 'Ponto de acesso criado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});

export const atualizarPonto = ({ dispatch, commit }, ponto) => axios.patch(`http://localhost/v1/ponto/${ponto.id}`, ponto).then(() => {
    commit(types.ATUALIZAR_PONTO_DE_DOACAO, ponto);
    dispatch('alert/success', 'Ponto foi atualizado com sucesso!', { root: true });
}).catch((error) => {
    dispatch('alert/error', error.response.data.error, {
        root: true,
    });
});

export const setPontoEditar = ({ commit }, pontoEditar) => {
    commit(types.SET_PONTO_EDITAR, pontoEditar);
};

export const cleanPontoEditar = ({ commit }, pontoEditar) => {
    commit(types.CLEAN_PONTO_EDITAR, pontoEditar);
};
