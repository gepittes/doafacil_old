import * as types from './types';

export const mutations = {
    [types.ESTADO_PNL_CREATE](state, payload) {
        state.statusPainel = payload
    },
    [types.CRIAR_EVENTO](state, payload) {
        console.log(payload);
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