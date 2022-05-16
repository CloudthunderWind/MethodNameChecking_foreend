import {message} from "ant-design-vue";
import {loginByUsernameAPI, registerAPI} from "../../api/userAPI";

const user = {
    state: {
        user_id: 4,
        user_name: "j",
        isLogged: false,
        history_list: [
        ]
    },
    mutations: {
        set_userStatus(state, flag) {
            state.isLogged = flag;
        },
        set_userId(state, id) {
            state.user_id = id;
        },
        set_userName(state, name) {
            state.user_name = name;
        },
        set_history_list(state, list) {
            state.history_list = list;
        },
        add_to_history_list(state,file_info){
            state.history_list.push(file_info);
        }
    },
    actions: {
        register: async function ({commit}, user_info) {
            const res = await registerAPI(user_info);
            console.log(user_info);
            console.log(res);
            if (res.isSuccess) {
                message.success("注册成功");
            } else {
                message.error("注册失败");
            }
        },
        log_in: async function ({commit}, user_info) {
            const res = await loginByUsernameAPI(user_info);
            if (res.isSuccess) {
                commit("set_userId", res.data.id);
                commit("set_userName", res.data.username);
                commit("set_userStatus", true);
                message.success("你好！" + res.data.username);
            } else {
                message.error("用户名或密码错误");
            }
        }
    }
};
export default user;