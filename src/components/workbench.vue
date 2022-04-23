<template>
    <div class="workbench-wrapper">
        <a-modal :visible="github_import_visible"
                 ok-text="导入"
                 @ok="submitURL"
                 @cancel="close_github_import_dialog">
            <template #title>
                <github-outlined/>
                从github仓库导入java源码
            </template>
            <a-form name="github_url_register">
                <a-form-item label="GitHub URL:">
                    <a-input :value="github_url"></a-input>
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
                        :fileList="upload_file_list"
                        name="java_files"
                        :mulitple="true"
                        :action="upload_request"
                        @change=""
                        @drop="">
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
                    <github-outlined style="font-size: 80px;"/>
                    <span>从GitHub导入项目</span>
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
                <div class="record-card history-card" @click="find_details">
                    <div class="history-card-title">test.java</div>
                    <div class="history-card-body">
                        <span>历史记录信息示例</span>
                    </div>
                    <a class="history-card-footer"></a>
                </div>
            </div>
            <div class="history-footer">
                <span>当前共 1 条历史，最多可存储 30 条历史</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        UploadOutlined,
        HistoryOutlined,
        GithubOutlined,
        InboxOutlined,
        ArrowLeftOutlined
    } from "@ant-design/icons-vue";
    import {mapActions} from "vuex";

    export default {
        name: "workbench",
        components: {
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
                upload_request: "https://localhost:8081/api/uploadFiles",
                github_import_visible: false,
                github_url: "",
                history_visible: false,
                history_list: []
            };
        },
        methods: {
            ...mapActions([]),
            open_upload_dialog() {
                this.upload_visible = true;
            },
            close_upload_dialog() {
                this.upload_visible = false;
            },
            submitUploadFileList() {
                this.upload_visible = false;
            },
            //从github导入方法
            open_github_import_dialog() {
                this.github_import_visible = true;
            },
            close_github_import_dialog() {
                this.github_import_visible = false;
            },
            submitURL() {
                this.github_import_visible = false;
            },
            //历史记录方法
            open_history_dialog() {
                this.history_visible = true;
            },
            close_history_dialog() {
                this.history_visible = false;
            },
            find_details() {
                this.$router.push({
                    path: "/analysis"
                });
            }
        }
    };
</script>

<style scoped>
    @import "../assets/styles/workbench.css";
</style>