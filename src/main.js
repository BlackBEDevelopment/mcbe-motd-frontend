/**
 * MCBE MOTD Frontend
 * @author lixworth <lixworth@outlook.com>
 * @create 2021/12/25 Happy Christmas!
 */
import Vue from 'vue';
// import './plugins/axios';
import App from './App.vue';
// import './registerServiceWorker';
// import router from './router';
// import store from './store';
import vuetify from './plugins/vuetify';
// import './plugins/buttons';
import VueGitHubButtons from 'vue-github-buttons';

Vue.config.productionTip = false;

Vue.use(VueGitHubButtons, { useCache: true });
const app = new Vue({
  // router,
  // store,
  vuetify,
  render: h => h(App)
}).$mount('#app');

export default app;