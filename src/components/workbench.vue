<template>
    <div class="workbench-wrapper">
        <a-modal :visible="upload_visible"
                 ok-text="完成上传"
                 @ok="submitUploadFileList"
                 @cancel="close_upload_dialog">
            <template #title>
                上传java源码或项目 <span style="font-size: 11px;color:#f7474b">(*文件会自动上传)</span>
            </template>
            <div class="data-uploader">
                <a-upload-dragger
                        v-model:file-list="upload_file_list"
                        name="file"
                        :data="{'username':user_name}"
                        :mulitple="true"
                        action="http://localhost:8088/file/uploadZip"
                        @change="add_file"
                        @drop="drop_file">
                    <inbox-outlined style="font-size: 80px;color:#aaaaaa;margin-bottom: 8px"></inbox-outlined>
                    <div>点击或拖动文件到此处以进行上传</div>
                </a-upload-dragger>
            </div>
        </a-modal>
        <a-modal :visible="gitee_import_visible"
                 ok-text="导入"
                 :confirmLoading="importLoading"
                 @ok="submitURL"
                 @cancel="close_github_import_dialog">
            <template #title>
                <icon>
                    <template #component>
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             width="16" height="16" fill="#aaaaaa">
                            <path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512
                                512-229.248 512-512 512z m259.168-568.896h-290.752a25.28 25.28 0 0 0-25.28 25.28l-0.032
                                 63.232c0 13.952 11.296 25.28 25.28 25.28h177.024a25.28 25.28 0 0 1 25.28
                                 25.28v12.64a75.84 75.84 0 0 1-75.84 75.84h-240.224a25.28 25.28 0 0
                                 1-25.28-25.28v-240.192a75.84 75.84 0 0 1 75.84-75.84h353.92a25.28 25.28 0 0 0
                                 25.28-25.28l0.064-63.2a25.312 25.312 0 0 0-25.28-25.312H417.184a189.632 189.632 0 0
                                 0-189.632 189.6v353.952c0 13.952 11.328 25.28 25.28 25.28h372.928a170.656 170.656 0 0
                                 0 170.656-170.656v-145.376a25.28 25.28 0 0 0-25.28-25.28z">
                            </path>
                        </svg>
                    </template>
                </icon>
                从gitee仓库导入java源码
            </template>
            <a-form name="github_url_register">
                <a-form-item label="Https Gitee URL:">
                    <label>
                        <input class="cb-input" v-model="gitee_url"/>
                    </label>
                </a-form-item>
            </a-form>
        </a-modal>
        <div v-if="!history_visible" class="work-frame">
            <div class="part-wrapper">
                <div class="record-card selector-block" @click="open_upload_dialog">
                    <upload-outlined style="font-size: 80px;"/>
                    <span>上传java代码</span>
                </div>
            </div>
            <div class="part-wrapper">
                <div class="record-card selector-block" @click="open_github_import_dialog">
                    <icon>
                        <template #component>
                            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 width="80" height="80" fill="#aaaaaa">
                                <path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512
                                512-229.248 512-512 512z m259.168-568.896h-290.752a25.28 25.28 0 0 0-25.28 25.28l-0.032
                                 63.232c0 13.952 11.296 25.28 25.28 25.28h177.024a25.28 25.28 0 0 1 25.28
                                 25.28v12.64a75.84 75.84 0 0 1-75.84 75.84h-240.224a25.28 25.28 0 0
                                 1-25.28-25.28v-240.192a75.84 75.84 0 0 1 75.84-75.84h353.92a25.28 25.28 0 0 0
                                 25.28-25.28l0.064-63.2a25.312 25.312 0 0 0-25.28-25.312H417.184a189.632 189.632 0 0
                                 0-189.632 189.6v353.952c0 13.952 11.328 25.28 25.28 25.28h372.928a170.656 170.656 0 0
                                 0 170.656-170.656v-145.376a25.28 25.28 0 0 0-25.28-25.28z">
                                </path>
                            </svg>
                        </template>
                    </icon>
                    <span>从Gitee导入项目</span>
                </div>
            </div>
            <div class="part-wrapper">
                <div class="record-card selector-block" @click="open_history_block">
                    <history-outlined style="font-size: 80px;"/>
                    <span>查看历史</span>
                </div>
            </div>
        </div>
        <div v-if="history_visible" class="history-frame">
            <div class="history-title" @click="close_history_block">
                <div class="icon-align">
                    <arrow-left-outlined style="font-size: 14px;color:#1890ff;margin-right: 8px"/>
                    历史记录
                </div>
            </div>
            <div class="history-body">
                <a-spin class="history-spinning" v-if="isSpinning"/>
                <div v-for="(file) in history_list" class="record-card history-card"
                     :data-id="file.id">
                    <div class="history-card-title">{{file.filename}}</div>
                    <div class="history-card-body">
                        <span></span>
                    </div>
                    <div class="history-card-footer">
                        <div class="footer-tag">
                            <div class="prefix-circle"></div>
                            Java
                        </div>
                        <div class="footer-func">
                            <span :data-id="file.id" @click="find_details">查看</span>
                            <span :data-id="file.id" @click="delete_history">删除</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="history-footer">
                <span>当前共 {{history_list.length}} 条历史，最多可存储 30 条历史</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon, {
        UploadOutlined,
        HistoryOutlined,
        GithubOutlined,
        InboxOutlined,
        ArrowLeftOutlined
    } from "@ant-design/icons-vue";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {message, Modal} from "ant-design-vue";
    import {ref} from "vue";
    import {toRaw} from "@vue/reactivity";

    export default {
        name: "workbench",
        components: {
            Icon,
            UploadOutlined,
            HistoryOutlined,
            GithubOutlined,
            InboxOutlined,
            ArrowLeftOutlined
        },
        data() {
            return {
                upload_visible: false,
                upload_file_list: [],
                upload_request: "https://localhost:8080/file/uploadZip",
                gitee_import_visible: false,
                gitee_url: "",

                history_visible: false,
                isSpinning: false,
                importLoading: false
            };
        },
        async mounted() {
            await this.search_by_user_name(this.user_name);
        },
        computed: {
            ...mapGetters([
                "user_name",
                "history_list",
                "file_to_demonstrate",
                "file_to_demonstrate_paths",
                "current_name",
                "current_path"
            ])
        },
        methods: {
            ...mapMutations([
                "set_current_path",
                "set_current_name",
                "set_current_path_list",
                "set_file_type"
            ]),
            ...mapActions([
                "upload_file",
                "import_from_git",
                "search_by_user_name",
                "search_by_record_id",
                "get_recommend_by_filepath",
                "get_param_recommend_by_filepath",
                "delete_record",
                "get_file_content",
                "get_dir_path",
                "get_readme"
            ]),
            // 上传文件方法
            open_upload_dialog() {
                this.upload_visible = true;
            },
            close_upload_dialog() {
                this.upload_visible = false;
            },
            before_upload(file) {
                console.log("1");
                this.upload_file_list = [file, ...this.upload_file_list];
                return false;
            },
            submitUploadFileList() {
                let that = this;
                that.upload_visible = false;
            },
            add_file(info) {
                const status = info.file.status;
                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === "done") {
                    message.success(`${info.file.name} 上传成功。`);
                } else if (status === "error") {
                    message.error(`${info.file.name} 上传失败。`);
                }
            },
            drop_file(e) {
                console.log(e);
            },
            //从github导入方法
            open_github_import_dialog() {
                this.gitee_import_visible = true;
            },
            close_github_import_dialog() {
                this.gitee_import_visible = false;
            },
            submitURL() {
                let that = this;
                this.importLoading = true;
                this.import_from_git({
                    url: this.gitee_url,
                    username: this.user_name
                }).then(() => {
                    that.importLoading = false;
                    that.gitee_import_visible = false;
                }, () => {
                    that.importLoading = false;
                });
            },
            //历史记录方法
            open_history_block() {
                let that = this;
                this.search_by_user_name(this.user_name).then(() => {
                    this.history_visible = true;
                });
                // this.history_visible = true;
            },
            close_history_block() {
                this.history_visible = false;
            },
            find_details(e) {
                let that = this;
                let id = e.target.getAttribute("data-id");
                this.search_by_record_id(id).then(() => {
                    that.isSpinning = true;
                    if (that.file_to_demonstrate.filepath.indexOf(".") !== -1) {
                        that.set_file_type(true);
                        that.get_file_content(that.file_to_demonstrate.filepath);
                    } else {
                        that.set_file_type(false);
                        that.set_current_name(that.file_to_demonstrate.filename.split("/").splice(-1)[0]);
                        that.get_dir_path(that.file_to_demonstrate.filepath);
                    }
                    that.get_readme(that.file_to_demonstrate.filepath);
                }).then(() => {
                    that.set_current_path(that.file_to_demonstrate.filepath);
                    that.set_current_path_list([{
                        name: that.current_name,
                        path: that.current_path
                    }]);
                    that.isSpinning = false;
                }).then(() => {
                    that.$router.push({
                        path: "/analysis",
                    });
                });
                localStorage.setItem("latest_record_id", this.file_to_demonstrate.id);
                // this.$router.push({
                //     path: "/analysis"
                // });
            },
            delete_history(e) {
                let that = this;
                Modal.confirm({
                    title: "提示",
                    closable: true,
                    content: "你确定要删除该记录吗？",
                    onOk: () => {
                        that.delete_record(e.target.getAttribute("data-id")).then(() => {
                            that.search_by_user_name(this.user_name);
                        });
                    }
                });
            },
        }
    };
</script>

<style scoped>
    @import "../assets/styles/workbench.css";
    @import "../assets/styles/cbInput.css";
</style>