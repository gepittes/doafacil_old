import axios from 'axios';
import * as types from './types';

export const obterContas = ({ commit }) => {
  axios.get('http://localhost/v1/conta')
    .then((response) => {
      const data = response.data;
      commit(types.SET_CONTA, data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removerConta = ({ commit }, usuario_id) => {
  axios.delete(`http://localhost/v1/conta/${usuario_id}`)
    .then(() => {
      commit(types.DELETE_CONTA, usuario_id);
    });
};

export const cadastrarConta = ({ commit }, conta) => axios.post('http://localhost/v1/conta', conta)
  .then((response) => {
    const data = response.data;
    commit(types.SET_CONTA, data.data);
  });

export const atualizarConta = ({ commit }, conta) => axios.patch(`http://localhost/v1/conta/${conta.usuario_id}`, conta)
  .then(() => {
    commit(types.ATUALIZAR_CONTA, conta);
  })
  .catch((error) => {
    console.log(error);
  });
