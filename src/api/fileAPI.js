import {axios} from "../util/request";

const api = {
    file_api: "/file"
};

// 上传zip,data为数据
export function uploadFileAPI(data) {
    return axios({
        url: `${api.file_api}/uploadZip`,
        type: "POST",
        data
    });
}

// 从Git导入
export function importFromGitAPI(data) {
    return axios({
        url: `${api.file_api}/git`,
        type: "POST",
        data
    });
}

