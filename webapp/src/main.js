import './plugins/doafacil';
import './plugins/bootstrap';
import './plugins/mapbox';
import vuetify from './plugins/vuetify';
import VeeValidate from 'vee-validate';
import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';
import './registerServiceWorker';

import Default from "./views/layouts/Default";
import NoSideBar from "./views/layouts/NoSideBar";

Vue.component('default-layout', Default);
Vue.component('no-side-bar-layout', NoSideBar);

Vue.use(VeeValidate);

filters.create(Vue);

new Vue({
    vuetify,
    router,
    store,
    filters,
    render: h => h(App),
}).$mount('#app');
