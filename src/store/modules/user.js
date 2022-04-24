import {message} from "ant-design-vue";
import {loginByUsernameAPI, registerAPI} from "../../api/userAPI";

const user = {
    state: {
        user_id: 0,
        user_name: "User",
        isLogged: false,
        history_list: [
            {
                id: 0,
                name: "test.java",
                content: "//示例文件"
            }
        ]
    },
    mutations: {
        set_userStatus(state, flag) {
            state.isLogged = flag;
        }
    },
    actions: {
        register: async function ({commit}, user_info) {
            const res = await registerAPI(user_info);
            if (res.isSuccess) {
                message.success("注册成功");
            } else {
                message.error("注册失败")
            }
        },
        log_in: async function ({commit}, user_info) {
            const res = await loginByUsernameAPI(user_info);
            if (!res) {
                console.log("用户名或密码错误");
            }
        }
    }
};
export default user;