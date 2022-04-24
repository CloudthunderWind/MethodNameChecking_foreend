<template>
    <div class="workbench-wrapper">
        <a-modal :visible="gitee_import_visible"
                 ok-text="导入"
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
                    <a-input :value="gitee_url"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal :visible="upload_visible"
                 ok-text="提交"
                 @ok="submitUploadFileList"
                 @cancel="close_upload_dialog">
            <template #title>
                上传java源码或项目
            </template>
            <div class="data-uploader">
                <a-upload-dragger
                        v-model:file-list="upload_file_list"
                        name="java_files"
                        :mulitple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        @change="add_file"
                        @drop="drop_file">
                    <inbox-outlined style="font-size: 80px;color:#aaaaaa;margin-bottom: 8px"></inbox-outlined>
                    <div>点击或拖动文件到此处以进行上传</div>
                </a-upload-dragger>
            </div>
        </a-modal>
        <div v-if="!history_visible" class="work-frame">
            <div class="part-wrapper">
                <div class="record-card selector-block" @click="open_upload_dialog">
                    <upload-outlined style="font-size: 80px;"/>
                    <span>上传代码</span>
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
                <div class="record-card selector-block" @click="open_history_dialog">
                    <history-outlined style="font-size: 80px;"/>
                    <span>查看历史</span>
                </div>
            </div>
        </div>
        <div v-if="history_visible" class="history-frame">
            <div class="history-title" @click="close_history_dialog">
                <div class="icon-align">
                    <arrow-left-outlined style="font-size: 14px;color:#1890ff;margin-right: 8px"/>
                    历史记录
                </div>
            </div>
            <div class="history-body">
                <div v-for="(file) in history_list" class="record-card history-card"
                     :data-id="file.id">
                    <div class="history-card-title">{{file.name}}</div>
                    <div class="history-card-body">
                        <span>{{file.content}}</span>
                    </div>
                    <div class="history-card-footer">
                        <span :data-id="file.id" @click="find_details">查看</span>
                        <span :data-id="file.id" @click="delete_history">删除</span>
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
    import {mapActions, mapGetters} from "vuex";
    import {message} from "ant-design-vue";

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
                // upload_request: "https://localhost:8080/file/uploadZip",
                upload_request: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
                gitee_import_visible: false,
                gitee_url: "",
                history_visible: false,
            };
        },
        computed: {
            ...mapGetters([
                "history_list"
            ])
        },
        methods: {
            ...mapActions([
                "upload_file",
                "import_from_git",
                "search_by_record_id"
            ]),
            // 上传文件方法
            open_upload_dialog() {
                this.upload_visible = true;
            },
            close_upload_dialog() {
                this.upload_visible = false;
            },
            submitUploadFileList() {
                let that = this;
                // this.upload_file(this.fileList).then(() => {
                //     that.upload_visible = false;
                // });
                this.upload_visible = false;
            },
            add_file(info) {
                const status = info.file.status;
                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
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
                this.upload_file(this.fileList).then(() => {
                    that.upload_visible = false;
                });
                this.gitee_import_visible = false;
            },
            //历史记录方法
            open_history_dialog() {
                this.history_visible = true;
            },
            close_history_dialog() {
                this.history_visible = false;
            },
            find_details(e) {
                let that = this;
                this.search_by_record_id(e.target.getAttribute("data-id")).then((data) => {
                    that.$router.push({
                        path: "/analysis",
                        params: data
                    });
                });
                this.$router.push({
                    path: "/analysis"
                });
            },
            // TODO 从这里开始
            delete_history(e) {
                console.log(e.target.getAttribute("data-id"));
            }
        }
    };
</script>

<style scoped>
    @import "../assets/styles/workbench.css";
</style>