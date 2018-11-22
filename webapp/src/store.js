import Vue from 'vue';
import Vuex from 'vuex';

import plataforma from '@/modules/plataforma';
import account from '@/modules/account';
import user from '@/modules/user';
import alert from '@/modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        plataforma,
        account,
        user,
        alert
    },
    strict: true
});
