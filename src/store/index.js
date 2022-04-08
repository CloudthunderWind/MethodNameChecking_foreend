import Vuex from "vuex";
import Vue from "vue";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {

    },
    tag: {
        isLogged: false,
        // 服务器地址
        serverAddress: ""
    },
    mutations: {
        set_userStatus(state, flag) {
            state.isLogged = flag;
        }
    },
    actions: {},
    getters
});