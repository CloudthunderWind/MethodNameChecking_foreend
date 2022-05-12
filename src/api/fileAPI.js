import {axios} from "../util/request";

const api = {
    file_api: "/file"
};

// 上传zip,data为数据
export function uploadFileAPI(data) {
    return axios({
        url: `${api.file_api}/uploadZip/${data.username}`,
        type: "POST",
        data: data.file
    });
}

// 从Git导入
export function importFromGitAPI(data) {
    return axios({
        url: `${api.file_api}/git?username=${data.username}&url=${data.url}`,
        type: "GET",
    });
}

export function getFileDirectoryAPI(data) {
    data.replace(/\\/g, "/");
    return axios({
        url: `${api.file_api}/dir?dirpath=${data}`,
        type: "GET"
    });
}

export function getFileContentAPI(data) {
    data.replace(/\\/g, "/");
    return axios({
        url: `${api.file_api}/ctx?filepath=${data}`,
        type: "GET"
    });
}

export function getReadmeAPI(data) {
    data.replace(/\\/g, "/");
    return axios({
        url: `${api.file_api}/readme?dirpath=${data}`,
        type: "GET"
    });
}