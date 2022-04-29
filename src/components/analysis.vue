<template>
    <div class="analysis-wrapper">
        <a-breadcrumb style="padding-left: 8px">
            <a-breadcrumb-item>
                <code-outlined/>
                <router-link to="../workbench">工作台</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link to="../analysis">代码分析报告</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a>{{file_to_demonstrate.filename}}</a>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="code-block">
            <div class="project-block">
                <div class="directory">
                    <div class="directory-title">
                        <a-avatar shape="square">{{user_name}}</a-avatar>
                        <div class="directory-title-info">
                            <div>{{file_to_demonstrate.filename}}</div>
                        </div>
                    </div>
                    <div class="directory-body">
                        <div v-if="file_to_demonstrate.filepath.replace(/\\/g, '/') !== current_path"
                             class="directory-body-item"
                             :data-link="file_to_demonstrate_paths.parentPath.replace(/\\/g, '/')"
                             @click="linkToPath">
                            ../
                        </div>
                        <div v-for="(dir_path) in file_to_demonstrate_paths.dirs"
                             class="directory-body-item"
                             :data-link="dir_path.replace(/\\/g, '/')"
                             @click="linkToPath">
                            <folder-outlined class="prefix-icon"/>
                            {{dir_path.split("\\").slice(-1)[0]}}
                        </div>
                        <div v-for="(file_path) in file_to_demonstrate_paths.files"
                             class="directory-body-item"
                             :data-link="file_path.replace(/\\/g, '/')"
                             @click="linkToPath">
                            <file-outlined class="prefix-icon"/>
                            {{file_path.split("\\").slice(-1)[0]}}
                        </div>
                    </div>
                </div>
                <div class="code" v-if="file_type">
                    <div class="code-title">
                        <span>{{current_name}}</span>
                    </div>
                    <pre class="line-numbers code-body"><code
                            class="language-java">{{file_content}}</code></pre>
                </div>
            </div>
            <div class="recommend-block">
                <div class="recommend-title">
                    <setting-outlined class="prefix-icon"/>
                    <span>推荐信息</span>
                </div>
                <div class="recommend-body">
                    <div>
                        <a class="target-name">test</a>
                        <span class="target-location">On loc 1</span>
                    </div>
                    <div class="recommend-name">The method name should be better with "Test".</div>
                    <div class="recommend-link"><a>Use it</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Prism from "prismjs";
    import {
        SettingOutlined,
        CodeOutlined,
        FolderOpenOutlined,
        FolderOutlined,
        FileOutlined
    } from "@ant-design/icons-vue";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "analysis",
        components: {
            SettingOutlined,
            CodeOutlined,
            FolderOpenOutlined,
            FolderOutlined,
            FileOutlined
        },
        mounted() {
            // let id = localStorage.getItem("latest_record_id");
            // if (id) {
            //     this.search_by_record_id(id);
            // }
            Prism.highlightAll();
        },
        computed: {
            ...mapGetters([
                "user_name",
                "file_to_demonstrate",
                "file_to_demonstrate_paths",
                "file_content",
                "file_type",
                "current_path",
                "current_name"
            ])
        },
        data() {
            return {};
        },
        methods: {
            ...mapMutations([
                "set_file_type",
                "set_current_path",
                "set_current_name"
            ]),
            ...mapActions([
                "search_by_record_id",
                "get_file_content",
                "get_dir_path"
            ]),
            linkToPath(e) {
                let that = this;
                let link = e.target.getAttribute("data-link");
                this.set_current_path(link);
                if (link.indexOf(".") !== -1) {
                    that.get_file_content(link).then(() => {
                        Prism.highlightAll();
                    });
                    that.set_current_name(link.split("/").slice(-1)[0]);
                    that.set_file_type(true);
                } else {
                    this.get_dir_path(link);
                    that.set_file_type(false);
                }
            }
        }
    };
</script>

<style scoped>
    @import "../assets/styles/analysis.css";
    @import "../assets/styles/prism.css";

    pre {
        margin: 0;
        background-color: #ffffff;
    }

</style>