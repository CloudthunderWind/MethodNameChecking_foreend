import {axios} from "../util/request";

const api = {
    data_api: "/record"
};

// 添加历史记录
export function addHistoryRecordAPI(data) {
    return axios({
        url: `${api.data_api}/add`,
        type: "POST",
        data
    });
}

// 用户名查询所有历史记录,data为username
export function searchByUserNameAPI(data) {
    return axios({
        url: `${api.data_api}/nameSearch?username=${data}`,
        type: "GET",
    });
}

// 用记录id查询记录,data为record-id
export function searchByRecordIdAPI(data) {
    return axios({
        url: `${api.data_api}/idSearch?id=${data}`,
        type: "GET"
    });
}

// 用记录id查询推荐
export function getRecommendByFilepathAPI(data) {
    return axios({
        url: `${api.data_api}/gtnm?filepath=${data}`,
        type: "GET"
    });
}

// 用记录id查询参数推荐
export function getParamRecommendByFilepathAPI(data) {
    return axios({
        url: `${api.data_api}/paramRecommend?filepath=${data}`,
        type: "GET"
    });
}

// 删除一条记录，data为record-id
export function deleteRecordAPI(data) {
    return axios({
        url: `${api.data_api}/delete?id=${data}`,
        type: "GET"
    });
}