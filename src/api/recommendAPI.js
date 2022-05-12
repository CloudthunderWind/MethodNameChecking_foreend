import {axios} from "../util/request";

const api = {
    file_api: "/recommend"
};


export function getRecommendByFilepathAPI(data) {
    return axios({
        url: `${api.file_api}/gtnm?filepath=${data}`,
        type: "GET"
    });
}

// 用记录id查询参数推荐
export function getParamRecommendByFilepathAPI(data) {
    return axios({
        url: `${api.file_api}/paramRecommend?filepath=${data}`,
        type: "GET"
    });
}