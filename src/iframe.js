/**
 * MCBE MOTD Frontend
 * IFRAME Page
 * @author lixworth <lixworth@outlook.com>
 * @create 2021/12/27
 */
import {store, Vue, vuetify} from "./common";
import App from './Iframe.vue';
import VueGitHubButtons from 'vue-github-buttons';

Vue.config.productionTip = false;

Vue.use(VueGitHubButtons, {useCache: true});

const iframe = new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#iframe');

export default iframe;