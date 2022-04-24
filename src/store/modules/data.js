import {importFromGitAPI, uploadFileAPI} from "@/api/fileAPI";
import {message} from "ant-design-vue";
import {searchByRecordIdAPI} from "@/api/dataAPI";

const data = {
    state: {},
    mutations: {},
    actions: {
        upload_file: async function ({commit}, file_list) {
            const res = await uploadFileAPI(file_list);
            if (res.isSuccess) {
                message.success("导入成功");
            } else {
                message.error("导入失败");
            }
        },
        import_from_git: async function ({commit}, git_url) {
            const res = await importFromGitAPI(git_url);
            if (res.isSuccess) {
                message.success("导入成功");
            } else {
                message.error("导入失败");
            }
        },
        search_by_record_id: async function ({commit}, record_id) {
            const res = await searchByRecordIdAPI(record_id);
            if (res.isSuccess) {
                return res.data;
            } else {
                message.error("导入失败");
            }
        }
    }
};

export default data;