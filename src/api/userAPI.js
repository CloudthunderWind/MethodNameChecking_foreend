import axios from "axios";

const api = {
    user_api: "/user"
};

// 用户注册,data是一个UserVO
export function register(data) {
    return axios({
        url: `${api.user_api}/register`,
        method: "POST",
        data
    });
}

// 用户名登录，data包含用户名和密码
export function loginByUsernameAPI(data) {
    return axios({
        url: `${api.user_api}/loginByUsername`,
        method: "POST",
        data
    });
}

// 用户邮箱登录，data包含用户邮箱和密码
export function loginByEmail(data) {
    return axios({
        url: `${api.user_api}/loginByEmail`,
        method: "POST",
        data
    });
}