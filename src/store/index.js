import {createStore} from "vuex";
import getters from "./getters";
import user from "./modules/user";

const store = createStore({
    modules: {
        user
    },
    tag: {
        // 服务器地址
        serverAddress: ""
    },
    mutations: {},
    actions: {},
    getters
});

export default store;