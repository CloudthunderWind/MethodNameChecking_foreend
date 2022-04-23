import {createStore} from "vuex";
import getters from "./getters";
import user from "./modules/user";
import data from "./modules/data";

const store = createStore({
    modules: {
        user,
        data
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