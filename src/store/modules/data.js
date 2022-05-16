import {
    getFileContentAPI,
    getFileDirectoryAPI,
    getReadmeAPI,
    importFromGitAPI,
    uploadFileAPI
} from "@/api/fileAPI";
import {message} from "ant-design-vue";
import {
    deleteRecordAPI,
    searchByRecordIdAPI,
    searchByUserNameAPI
} from "@/api/dataAPI";
import {
    getAllRecommendsByFilePathAPI,
    getParamRecommendByFilepathAPI,
    getRecommendByFilepathAPI
} from "@/api/recommendAPI";

const data = {
    state: {
        file_to_demonstrate: {},
        file_content: "",
        readme_content: "",
        current_path: "",
        current_name: "",
        current_path_list: [],
        file_type: true,
        file_to_demonstrate_paths: {
            // dirs: ["nil folder"],
            // java_files: ["test.java"],
            // other_files:[]
        },
        recommend_infos: [
            // {
            //     method_name: "test",
            //     method_location:"1",
            //     possible_recommend: "test"
            // }
        ],
        param_recommend_infos: [
            // {
            //     param_name: "test",
            //     method_name: "test",
            //     param_location: "1",
            //     possible_recommends: ["test"]
            // }
        ],
        method_block_recommends: [
            {
                method_name: "testMethod",
                method_recommend_infos: {
                    method_name: "testMethod",
                    method_signature: "public void testMethod(String s,String b)",
                    possible_recommend: "TestMethod",
                    accuracy_type: "Warning"
                },
                param_recommend_infos: [
                    {
                        param_name: "s",
                        possible_recommends: [
                            "s", "SB", "NMB"
                        ],
                        recommends_accuracy_type: [
                            "Success", "Warning", "Danger"
                        ]
                    },
                    {
                        param_name: "b",
                        possible_recommends: [
                            "b", "SB", "2B"
                        ],
                        recommends_accuracy_type: [
                            "Success", "Warning", "Danger"
                        ]
                    }
                ],
                variable_recommend_infos: []
            }
        ],
        number_of_directory_lines: 0
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
        set_readme_content(state, content) {
            state.readme_content = content;
        },
        set_current_path(state, path) {
            state.current_path = path;
        },
        set_current_name(state, name) {
            state.current_name = name;
        },
        set_current_path_list(state, path_list) {
            state.current_path_list = path_list;
        },
        add_one_path(state, path) {
            state.current_path_list.push(path);
        },
        del_one_path(state) {
            state.current_path_list.pop();
        },
        set_file_type(state, type) {
            state.file_type = type;
        },
        set_recommend_infos(state, infos) {
            state.recommend_infos = infos;
        },
        set_param_recommend_infos(state, infos) {
            state.param_recommend_infos = infos;
        },
        set_method_block_recommends(state, recommends) {
            state.method_block_recommends = recommends;
        },
        get_number_of_directory_lines(state) {
            state.number_of_directory_lines = (state.current_path_list.length > 1 ? 1 : 0)
                + state.file_to_demonstrate_paths.dirs.length
                + state.file_to_demonstrate_paths.javaFiles.length
                + state.file_to_demonstrate_paths.otherFiles.length;
        }
    },
    actions: {
        upload_file: async function ({commit}, file_info) {
            const res = await uploadFileAPI(file_info);
            if (res.isSuccess) {
                message.success("导入成功,可在历史记录中进行查看");
            } else {
                message.error("导入失败,项目中不含任何java文件");
            }
        },
        import_from_git: async function ({commit}, url_info) {
            const res = await importFromGitAPI(url_info);
            if (res.isSuccess) {
                message.success("导入成功,可在历史记录中进行查看");
                commit("set_userName", res.data.username);
                commit("set_userId", res.data.id);
                commit("add_to_history_list", res.data);
            } else {
                message.error("导入失败,项目中不含任何java文件");
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
                if (!res.data) {
                    commit("set_param_recommend_infos", []);
                } else {
                    commit("set_param_recommend_infos", res.data);
                }
            } else {
                message.error("推荐信息获取失败");
            }
        },
        get_all_recommends_by_filepath: async function ({commit}, filepath) {
            const res = await getAllRecommendsByFilePathAPI(filepath);
            if (res.isSuccess) {
                commit("set_method_block_recommends", res.data);
            } else {
                message.error("推荐获取失败");
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
                commit("set_readme_content", "");
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
        },
        get_readme: async function ({commit}, dir_path) {
            const res = await getReadmeAPI(dir_path);
            if (res.isSuccess) {
                commit("set_readme_content", res.data);
            } else {
                message.info("找不到README.md文件");
            }
        }
    }
};

export default data;