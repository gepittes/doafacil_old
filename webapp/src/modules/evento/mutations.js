import * as types from "./types";

export const mutations = {
  [types.ESTADO_PNL_CREATE](state, payload) {
    state.statusPainel = payload;
  },
  [types.ESTADO_PNL_LIST](state, payload) {
    state.statusPainelList = payload;
  },
  [types.CRIAR_EVENTO](state, payload) {
    state.eventosInsti.push(payload);
  },
  [types.EVENTOS_INSTITUICAO](state, payload) {
    state.eventosInsti = payload;
  },
  [types.DELETAR_EVENTO](state, eventoID) {
    const index = state.eventosInsti.findIndex(
      eventosInsti => eventosInsti.id === eventoID
    );
    state.eventosInsti.splice(index, 1);
  },
  [types.ATUALIZAR_EVENTO](state, eventoEditar) {
    const index = state.eventosInsti.findIndex(
      evento => evento.id === eventoEditar.id
    );
    Object.assign(state.eventosInsti[index], eventoEditar);
  },
  [types.EVENTO_EDITAR](state, evento) {
    state.eventoEditar = evento;
  },
  [types.VISIBLE_PNL_CREATE](state, payload) {
    state.isVisible = payload;
  }
};
