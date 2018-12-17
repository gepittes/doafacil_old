import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import VeeValidate from 'vee-validate';

// process.env.NODE_CONFIG_DIR = './config'

import { configureFakeBackend } from './modules/_helpers';

Vue.use(VeeValidate);
configureFakeBackend();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
