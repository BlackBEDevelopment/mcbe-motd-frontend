import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dark: null
    },
    mutations: {
        mutationDark(state, data) {
            state.dark = data;
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()],
});
