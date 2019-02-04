import axios from 'axios';
import * as types from './types';

export const obterNotificacoesUsuario = ({ commit }, usuario_id) => {
  axios.get(`http://localhost/v1/notificacao-usuario/${usuario_id}`)
    .then((response) => {
      const data = response.data;
      commit(types.DEFINIR_NOTIFICACOES_BADGE, data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const obterNotificacoesUsuarioSistema = ({ commit }, usuario_id, sistema_id) => {
  axios.post(`http://localhost/v1/notificacao-sistema`,
    {
      usuario_id: usuario_id,
      sistema_id: sistema_id,
    })
    .then((response) => {
      const data = response.data;
      commit(types.DEFINIR_NOTIFICACOES_BADGE, data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
