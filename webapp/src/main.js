import './plugins/doafacil';
import './plugins/bootstrap';
import vuetify from './plugins/vuetify';
import VeeValidate from 'vee-validate';
import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';
import './registerServiceWorker';

import { configureFakeBackend } from './modules/_helpers';

Vue.use(VeeValidate);
configureFakeBackend();

filters.create(Vue);

new Vue({
    vuetify,
    router,
    store,
    filters,
    render: h => h(App),
}).$mount('#app');
