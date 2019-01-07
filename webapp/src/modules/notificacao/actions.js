import axios from 'axios';
import * as types from './types';

export const obterNotificacaos = ({ commit }) => {
  axios.get('http://localhost/v1/notificacao')
    .then((response) => {
console.log(response.data)
      const data = response.data;
      commit(types.DEFINIR_NOTIFICACOES, data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removerNotificacao = ({ commit }, notificacao_id) => {
  axios.delete(`http://localhost/v1/notificacao/${notificacao_id}`)
    .then(() => {
      commit(types.REMOVER_NOTIFICACAO, notificacao_id);
    });
};

export const cadastrarNotificacao = ({ commit }, notificacao) => axios.post('http://localhost/v1/notificacao', notificacao)
  .then((response) => {
    const data = response.data;
    commit(types.ACRESCENTAR_NOTIFICACAO, data.data);
  }).catch((error) => {
    console.log(error);
  });

export const atualizarNotificacao = ({ commit }, notificacao) => axios.patch(`http://localhost/v1/notificacao/${notificacao.notificacao_id}`, notificacao)
  .then(() => {
    commit(types.ATUALIZAR_NOTIFICACAO, notificacao);
  })
  .catch((error) => {
    console.log(error);
  });
