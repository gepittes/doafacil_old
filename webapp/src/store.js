import Vue from 'vue';
import Vuex from 'vuex';

import account from '@/modules/account';
import user from '@/modules/user';
import alert from '@/modules/alert';
import conta from '@/modules/conta';
import plataforma from '@/modules/plataforma';
import sistema from '@/modules/sistema';
import mensagem from '@/modules/mensagem';
import notificacao from '@/modules/notificacao';
import notificacaoBadge from '@/modules/notificacaoBadge';

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    account,
    user,
    alert,
    plataforma,
    sistema,
    conta,
    mensagem,
    notificacao,
    notificacaoBadge,
  },
  strict: true,
});
