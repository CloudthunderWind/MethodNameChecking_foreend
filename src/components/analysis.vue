<template>
    <div class="analysis-wrapper">
        <a-spin class="analysis-spinning" v-if="isSpinning"/>
        <a-breadcrumb style="padding-left: 8px">
            <a-breadcrumb-item>
                <code-outlined/>
                <router-link to="../workbench">工作台</router-link>
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
                <div v-if="(param_recommend_infos.length+recommend_infos.length)<1" class="recommend-body">
                    <div class="target-name">No recommendation.</div>
                </div>
                <div v-for="info in recommend_infos" class="recommend-body">
                    <div>
                        <a class="target-name">{{"MethodName:"+info.method_name}}</a>
                    </div>
                    <div class="recommend-name">
                        The method name may be better with "<a>{{info.possible_recommend}}</a>
                    </div>
                </div>
                <div v-for="info in param_recommend_infos" class="recommend-body">
                    <div>
                        <a class="target-name">{{"MethodName:"+info.method_name+(info.param_name?"-->ParamName:"+info.param_name:"")}}</a>
                        <span class="target-location">On loc {{info.method_location}}</span>
                    </div>
                    <div class="recommend-name" v-for="(recommend) in info.possible_recommends">
                        The param name may be better with "<a>{{recommend}}</a>".
                    </div>
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
                "current_name",
                "recommend_infos",
                "param_recommend_infos"
            ])
        },
        data() {
            return {
                isSpinning: false,
            };
        },
        methods: {
            ...mapMutations([
                "set_file_type",
                "set_current_path",
                "set_current_name",
            ]),
            ...mapActions([
                "search_by_record_id",
                "get_file_content",
                "get_dir_path",
                "get_param_recommend_by_filepath",
                "get_recommend_by_filepath"
            ]),
            async linkToPath(e) {
                let that = this;
                let link = e.target.getAttribute("data-link");
                this.isSpinning = true;
                this.set_current_path(link);
                if (link.indexOf(".") !== -1) {
                    that.get_file_content(link).then(() => {
                        Prism.highlightAll();
                        that.get_param_recommend_by_filepath(link).then(() => {
                            that.get_recommend_by_filepath(link).then(() => {
                                that.$message.success("推荐获取成功");
                                that.isSpinning = false;
                            });
                        });
                        that.set_current_name(link.split("/").slice(-1)[0]);
                    });
                    that.set_file_type(true);
                } else {
                    that.get_dir_path(link).then(() => {
                        that.isSpinning = false;
                    });
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