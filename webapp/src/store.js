import Vue from 'vue';
import Vuex from 'vuex';

import plataforma from '@/modules/plataforma';
import conta from '@/modules/conta';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        plataforma,
        conta
    }

});
