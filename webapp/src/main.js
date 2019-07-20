import '@fortawesome/fontawesome-free/css/all.css';
import VeeValidate from 'vee-validate';
import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
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
    router,
    store,
    filters,
    render: h => h(App),
}).$mount('#app');
