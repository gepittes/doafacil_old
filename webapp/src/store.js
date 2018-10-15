import Vue from 'vue';
import Vuex from 'vuex';

import plataforma from '@/models/plataforma';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        plataforma
    }

});
