import {getFileContentAPI, getFileDirectoryAPI, importFromGitAPI, uploadFileAPI} from "@/api/fileAPI";
import {message} from "ant-design-vue";
import {
    deleteRecordAPI,
    getParamRecommendByFilepathAPI,
    getRecommendByFilepathAPI,
    searchByRecordIdAPI,
    searchByUserNameAPI
} from "@/api/dataAPI";

const data = {
    state: {
        file_to_demonstrate: {
            id: 0,
            filename: "test.java",
        },
        file_content: "int x=10;\nint y=x+10;\n",
        current_path: "",
        current_name: "",
        file_type: true,
        file_to_demonstrate_paths: {
            parentPath: "",
            dirs: ["nil folder"],
            files: ["test.java"],
        },
        recommend_infos: [],
        param_recommend_infos: [
            {
                param_name: "test",
                method_name: "test",
                method_location: "1",
                possible_recommends: ["test"]
            }
        ]
    },
    mutations: {
        set_file_to_demonstrate(state, file) {
            state.file_to_demonstrate = file;
        },
        set_file_to_demonstrate_paths(state, file_path_list) {
            state.file_to_demonstrate_paths = file_path_list;
        },
        set_file_content(state, content) {
            state.file_content = content;
        },
        set_current_path(state, path) {
            state.current_path = path;
        },
        set_current_name(state, name) {
            state.current_name = name;
        },
        set_file_type(state, type) {
            state.file_type = type;
        },
        set_recommend_infos(state, infos) {
            state.recommend_infos = infos;
        },
        set_param_recommend_infos(state, infos) {
            state.param_recommend_infos = infos;
        }
    },
    actions: {
        upload_file: async function ({commit}, file_info) {
            const res = await uploadFileAPI(file_info);
            if (res.isSuccess) {
                message.success("导入成功");
            } else {
                message.error("导入失败");
            }
        },
        import_from_git: async function ({commit}, url_info) {
            const res = await importFromGitAPI(url_info);
            if (res.isSuccess) {
                message.success("导入成功，可在历史记录中进行查看");
                commit("set_userName", res.data.username);
                commit("set_userId", res.data.id);
                commit("add_to_history_list", res.data);
            } else {
                message.error("导入失败");
            }
        },
        search_by_user_name: async function ({commit}, username) {
            const res = await searchByUserNameAPI(username);
            if (res.isSuccess) {
                commit("set_history_list", res.data);
            } else {
                message.error("读取用户历史失败");
            }
        },
        search_by_record_id: async function ({commit}, record_id) {
            const res = await searchByRecordIdAPI(record_id);
            if (res.isSuccess) {
                commit("set_file_to_demonstrate", res.data);
            } else {
                message.error("查询失败");
            }
        },
        get_recommend_by_filepath: async function ({commit}, filepath) {
            const res = await getRecommendByFilepathAPI(filepath);
            if (res.isSuccess) {
                commit("set_recommend_infos", res.data);
            } else {
                message.error("推荐信息获取失败");
            }
        },
        get_param_recommend_by_filepath: async function ({commit}, filepath) {
            const res = await getParamRecommendByFilepathAPI(filepath);
            if (res.isSuccess) {
                commit("set_param_recommend_infos", res.data);
            } else {
                message.error("推荐信息获取失败");
            }
        },
        delete_record: async function ({commit}, record_id) {
            const res = await deleteRecordAPI(record_id);
            if (res.isSuccess) {
                message.success("删除成功");
            } else {
                message.error("删除失败");
            }
        },
        get_file_content: async function ({commit}, file_path) {
            const res = await getFileContentAPI(file_path);
            if (res.isSuccess) {
                commit("set_file_content", res.data);
            } else {
                message.error("找不到文件内容");
            }
        },
        get_dir_path: async function ({commit}, dir_path) {
            const res = await getFileDirectoryAPI(dir_path);
            if (res.isSuccess) {
                commit("set_file_to_demonstrate_paths", res.data);
            } else {
                message.error("找不到文件路径");
            }
        }
    }
};

export default data;