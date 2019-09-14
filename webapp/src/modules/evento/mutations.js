import * as types from './types';

export const mutations = {
    [types.ESTADO_PNL_CREATE](state, payload) {
        state.statusPainel = payload
    },
    [types.ESTADO_PNL_LIST](state, payload) {
        state.statusPainelList = payload
    },
    [types.CRIAR_EVENTO](state, payload) {
        state.eventosInsti.push(payload)
    },
    [types.EVENTOS_INSTITUICAO](state, payload) {
        state.eventosInsti = payload
    },
    [types.DELETAR_EVENTO](state, eventoID){
        const index = state.eventosInsti.findIndex(eventosInsti => eventosInsti.id === eventoID);
        state.eventosInsti.splice(index, 1);
    }
};