/**
 * MCBE MOTD Frontend
 * @author lixworth <lixworth@outlook.com>
 * @create 2021/12/25 Happy Christmas!
 */
import {store, Vue, vuetify} from "./common";
import App from './App.vue';
import VueGitHubButtons from 'vue-github-buttons';
import anime from "animejs";
import router from "@/router";

Vue.config.productionTip = false;

Vue.use(VueGitHubButtons, {useCache: true});

window.anime = anime;

const index = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#index');

export default index;
