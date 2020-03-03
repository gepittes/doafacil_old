import * as types from './types';

export const mutations = {
    [types.OBTER_PONTO_DE_DOACOES](state, ponto) {
        state.ponto = ponto;
    },
    [types.ACRESCENTAR_PONTO_DE_DOACAO](state, ponto) {
        state.ponto.push(ponto);
    },
    [types.DELETE_PONTO_DE_DOACAO](state, pontoId) {
        const index = state.ponto.findIndex(ponto => ponto.ponto_id === pontoId);
        state.ponto.splice(index, 1);
    },
    [types.ATUALIZAR_PONTO_DE_DOACAO](state, pontoEditada) {
        const index = state.ponto.findIndex(ponto => ponto.id === pontoEditada.id);
        Object.assign(state.ponto[index], pontoEditada);
    },
    [types.GET_PONTO_BY_INSTITUICAO](state, ponto) {
        state.ponto = ponto;
    },
    [types.SET_PONTO_EDITAR](state, pontoEditar) {
        state.pontoEditar = pontoEditar;
    },
    [types.CLEAN_PONTO_EDITAR](state, pontoEditar) {
        state.pontoEditar = pontoEditar;
    },
};
