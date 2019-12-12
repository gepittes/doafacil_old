import Vue from 'vue';
import Vuex from 'vuex';

import account from '@/modules/account';
import user from '@/modules/user';
import alert from '@/modules/alert';
import conta from '@/modules/conta';
import instituicao from '@/modules/instituicao';
import ponto from '@/modules/ponto';
import evento from '@/modules/evento';
import image from '@/modules/image';


Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        account,
        user,
        alert,
        conta,
        ponto,
        instituicao,
        evento,
        image,
    },
    strict: true,
});
