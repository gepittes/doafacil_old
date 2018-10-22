import Vue from 'vue';
import Vuex from 'vuex';

import plataforma from '@/models/plataforma';
import conta from '@/models/conta';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        plataforma,
        conta
    }

});
