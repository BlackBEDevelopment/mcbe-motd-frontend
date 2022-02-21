/**
 * MCBE MOTD Frontend
 * IFRAME Page
 * @author lixworth <lixworth@outlook.com>
 * @create 2021/12/27
 */
import {store, Vue, vuetify} from "./common";
import Iframe from './Iframe.vue';
import VueGitHubButtons from 'vue-github-buttons';
import router from "@/router";

Vue.config.productionTip = false;

Vue.use(VueGitHubButtons, {useCache: true});

const iframe = new Vue({
  router,
  store,
  vuetify,
  render: h => h(Iframe)
}).$mount('#iframe');

export default iframe;
