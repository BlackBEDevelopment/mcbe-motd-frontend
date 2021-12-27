import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    state: {
        dark: null
    },
    mutations: {
        mutationDark(state,data){
            state.dark = data;
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState()],
});
