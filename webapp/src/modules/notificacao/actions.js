import axios from 'axios';
import * as types from './types';

export const obterNotificacaos = ({dispatch, commit}) => {
  axios.get('http://localhost/v1/notificacao')
    .then((response) => {
      const data = response.data;
      commit(types.DEFINIR_NOTIFICACOES, data.data);
    })
    .catch(error => {
      dispatch('alert/error', error.response.data.error, {
        root: true,
      });
    });
};

export const removerNotificacao = ({dispatch, commit}, notificacao_id) => {
  axios.delete(`http://localhost/v1/notificacao/${notificacao_id}`)
    .then(() => {
      commit(types.REMOVER_NOTIFICACAO, notificacao_id);
    }).catch(error => {
    dispatch('alert/error', error.response.data.error, {
      root: true,
    });
  });
};

export const cadastrarNotificacao = ({dispatch, commit}, notificacao) => axios.post('http://localhost/v1/notificacao', notificacao)
  .then((response) => {
    const data = response.data;
    commit(types.ACRESCENTAR_NOTIFICACAO, data.data);
  }).catch(error => {
    dispatch('alert/error', error.response.data.error, {
      root: true,
    });
  });

export const atualizarNotificacao = ({dispatch, commit}, notificacao) => axios.patch(`http://localhost/v1/notificacao/${notificacao.notificacao_id}`, notificacao)
  .then(() => {
    commit(types.ATUALIZAR_NOTIFICACAO, notificacao);
  })
  .catch(error => {
    dispatch('alert/error', error.response.data.error, {
      root: true,
    });
  });
