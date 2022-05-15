<template>
    <div class="analysis-wrapper">
        <a-spin class="analysis-spinning" v-if="isSpinning">第一次加载可能会持续1分钟左右，请耐心等待哦~</a-spin>
        <a-breadcrumb style="padding-left: 8px">
            <a-breadcrumb-item>
                <code-outlined/>
                <router-link to="../workbench" @click="clearDemonstrate">工作台</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for="(path) in current_path_list">
                <a :data-link="path.path.replace(/\\/g,'/')" @click="selectToPath">{{path.name}}</a>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="code-block">
            <div class="project-block">
                <div class="directory">
                    <div class="directory-title">
                        <div class="directory-title-info">
                            <a-avatar shape="square">{{user_name}}</a-avatar>
                            <div><span>{{file_to_demonstrate.filename}}</span></div>
                        </div>
                        <div class="caret-down-icon" @click="changeDirectoryState">
                            <caret-down-outlined id="caret-icon"/>
                        </div>
                    </div>
                    <div id="directory" class="directory-body">
                        <div v-if="current_path_list.length>1"
                             class="directory-body-item"
                             :data-link="file_to_demonstrate_paths.parentPath.replace(/\\/g, '/')"
                             @click="backToPath">
                            ../
                        </div>
                        <div v-for="(dir_path) in file_to_demonstrate_paths.dirs"
                             class="directory-body-item"
                             :data-link="dir_path.replace(/\\/g, '/')"
                             @click="linkToPath">
                            <folder-outlined class="prefix-icon"/>
                            {{dir_path.split("\\").slice(-1)[0]}}
                        </div>
                        <div v-for="(file_path) in file_to_demonstrate_paths.javaFiles"
                             class="directory-body-item"
                             :data-link="file_path.replace(/\\/g, '/')"
                             @click="linkToPath">
                            <file-outlined class="prefix-icon"/>
                            {{file_path.split("\\").slice(-1)[0]}}
                        </div>
                        <div v-for="(file_path) in file_to_demonstrate_paths.otherFiles"
                             class="disabled-item directory-body-item"
                             @click="notice">
                            <file-unknown-outlined class="prefix-icon"/>
                            {{file_path.split("\\").slice(-1)[0]}}
                        </div>
                        <div v-if="isFold&&numberOfDirectoryLines>5" class="caret-expand" @click="changeDirectoryState">
                            <down-outlined/>
                        </div>
                    </div>
                </div>
                <div class="code" v-if="file_type">
                    <div class="code-title">
                        <span>{{current_name}}</span>
                    </div>
                    <pre id="display-code" class="line-numbers linkable-line-numbers code-body"><code
                            class="language-java">{{file_content}}</code></pre>
                </div>
                <div class="code" v-if="readme_content">
                    <div class="code-title">
                        <span>README.md</span>
                    </div>
                    <v-md-preview class="code-body" :text="readme_content">
                    </v-md-preview>
                </div>
            </div>
            <div class="recommend-block">
                <div class="recommend-title">
                    <div>
                        <setting-outlined class="prefix-icon"/>
                        <span>推荐信息</span>
                    </div>
                    <div class="recommend-filter-icon" @click="changeFilter">
                        <filter-outlined/>
                    </div>
                </div>
                <div id="filter" class="recommend-filter-block">
                    <div class="recommend-filter-block-wrapper">
                        <div>
                            <a-checkbox v-model:checked="filterOptions.paramNameRecommend"
                                        @change="filterParamName">显示推荐的参数名
                            </a-checkbox>
                        </div>
                        <div>
                            <a-checkbox v-model:checked="filterOptions.variableNameRecommend"
                                        @change="filterVariableName">显示推荐的变量名
                            </a-checkbox>
                        </div>
                        <div>
                            <a-checkbox v-model:checked="filterOptions.displayError"
                                        @change="filterInfo">
                                显示较差的命名
                                <close-circle-outlined style="color:#f7474b"/>
                                (推荐与原命名有较大差异)
                            </a-checkbox>
                        </div>
                        <div>
                            <a-checkbox v-model:checked="filterOptions.displayWarning"
                                        @change="filterInfo">
                                显示一般的命名
                                <warning-outlined style="color:#faad14"/>
                                (推荐与原命名有一定差异)
                            </a-checkbox>
                        </div>
                        <div>
                            <a-checkbox v-model:checked="filterOptions.displaySuccess"
                                        @change="filterInfo">
                                显示正确的命名
                                <check-square-outlined style="color:#52c41a"/>
                                (推荐与原命名无差异)
                            </a-checkbox>
                        </div>
                    </div>
                </div>
                <div v-if="(methodBlockRecommends.length)<1"
                     class="recommend-body">
                    <div class="target-name">No recommendation.</div>
                </div>
                <div v-for="info in methodBlockRecommends" class="recommend-body">
                    <div>
                        <div>
<!--                            方法推荐块-->
                            <a class="target-name"
                               :href="(info.method_location>=0)?'#display-code.'+info.method_location:''">
                                {{info.method_name_infos.method_signature}}
                            </a>
                        </div>
                        <div class="recommend-name">
                            Possible recommendations:
                            <div>
                                <check-square-outlined v-if="info.distance===1" style="color:#52c41a"/>
                                <warning-outlined v-if="info.distance<1&&info.distance>=0.3" style="color:#faad14"/>
                                <close-circle-outlined v-if="info.distance<0.3" style="color:#f7474b"/>
                                <span>{{info.possible_recommend}}</span>
                            </div>
                        </div>
                        <div class="recommend-body">
                            <div class="split-line"></div>
                            <div>
                                <div>
<!--                                    参数推荐块-->
                                    <div v-for="param_info in info.param_recommend_infos" class="recommend-body">
                                        <div>
                                            <a class="target-name"
                                               :href="(param_info.param_location>=0)?'#display-code.'+param_info.param_location:''">
                                                {{param_info.param_name}}
                                            </a>
                                        </div>
                                        <div class="recommend-name">
                                            Possible recommendations:
                                            <div v-for="(param_recommend,index) in param_info.possible_recommends">
                                                <check-square-outlined v-if="param_info.recommends_distance[index]===1" style="color:#52c41a"/>
                                                <warning-outlined v-if="param_info.recommends_distance[index]<1&&param_info.recommends_distance[index]>=0.3" style="color:#faad14"/>
                                                <close-circle-outlined v-if="param_info.recommends_distance[index].distance<0.3" style="color:#f7474b"/>
                                                <span>{{param_recommend}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
<!--                                    变量推荐块-->
                                    <div v-for="variable_info in info.variable_recommend_infos" class="recommend-body">
                                        <div>
                                            <a class="target-name"
                                               :href="(variable_info.param_location>=0)?'#display-code.'+variable_info.param_location:''">
                                                {{variable_info.param_name}}
                                            </a>
                                        </div>
                                        <div class="recommend-name">
                                            Possible recommendations:
                                            <div v-for="(variable_recommend,index) in variable_info.possible_recommends">
                                                <check-square-outlined v-if="variable_info.recommends_distance[index]===1" style="color:#52c41a"/>
                                                <warning-outlined v-if="variable_info.recommends_distance[index]<1&&variable_info.recommends_distance[index]>=0.3" style="color:#faad14"/>
                                                <close-circle-outlined v-if="variable_info.recommends_distance[index].distance<0.3" style="color:#f7474b"/>
                                                <span>{{variable_recommend}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showBackTop" class="back-top" @click="backToTop">
            <vertical-align-top-outlined/>
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
        FileOutlined,
        FileUnknownOutlined,
        CaretDownOutlined,
        DownOutlined,
        VerticalAlignTopOutlined,
        FilterOutlined,
        CheckSquareOutlined,
        WarningOutlined,
        CloseCircleOutlined
    } from "@ant-design/icons-vue";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "analysis",
        components: {
            SettingOutlined,
            CodeOutlined,
            FolderOpenOutlined,
            FolderOutlined,
            FileOutlined,
            FileUnknownOutlined,
            CaretDownOutlined,
            DownOutlined,
            VerticalAlignTopOutlined,
            FilterOutlined,
            CheckSquareOutlined,
            WarningOutlined,
            CloseCircleOutlined
        },
        mounted() {
            // let id = localStorage.getItem("latest_record_id");
            // if (id) {
            //     this.search_by_record_id(id);
            // }
            let number_of_lines = this.getNumberOfDirectoryLines();
            $("#directory").css({"height": 36 * number_of_lines + "px"});
            $(window).bind("hashchange", function () {
                let code_line = window.location.href.match(/#.*/);
                if (code_line) {
                    let code_line_position = $("#display-code div").offset().top;
                    // TODO 滚动定位偏移
                    window.history.pushState("", "", window.location.href.replace(/#.*/, ""));
                }
            });
            $(window).scroll(function () {
                let scrollTop = $(window).scrollTop();
                if (scrollTop > 48) {
                    $(".recommend-block").css({"position": "fixed", "top": "52px"});
                } else {
                    $(".recommend-block").css({"position": "absolute", "top": ""});
                }
                if (scrollTop > 600) {
                    this.showBackTop = true;
                    $(".back-top").css({"opacity": 1});
                } else {
                    let that = this;
                    $(".back-top").css({"opacity": 0});
                    setTimeout(() => {
                        that.showBackTop = false;
                    }, 400);
                }
            });
            Prism.highlightAll();
        },
        computed: {
            ...mapGetters([
                "user_name",
                "file_to_demonstrate",
                "file_to_demonstrate_paths",
                "file_content",
                "readme_content",
                "file_type",
                "current_path",
                "current_name",
                "current_path_list",
                "recommend_infos",
                "param_recommend_infos",
                "method_block_recommends"
            ])
        },
        data() {
            return {
                isSpinning: false,
                isFold: false,
                isFilter: false,
                numberOfDirectoryLines: 0,
                showBackTop: true,
                methodBlockRecommends: [],
                // 筛选选项
                filterOptions: {
                    paramNameRecommend: true,
                    variableNameRecommend: true,
                    displayError: true,
                    displayWarning: true,
                    displaySuccess: false
                }
            };
        },
        methods: {
            ...mapMutations([
                "set_file_type",
                "set_current_path",
                "set_current_name",
                "set_current_path_list",
                "set_recommend_infos",
                "set_param_recommend_infos",
                "add_one_path",
                "del_one_path"
            ]),
            ...mapActions([
                "search_by_record_id",
                "get_file_content",
                "get_dir_path",
                "get_param_recommend_by_filepath",
                "get_recommend_by_filepath",
                "get_all_recommends_by_filepath"
            ]),
            // 分离参数推荐和变量推荐
            splitParamAndVariable() {
                this.extractParam();
                this.extractVariable();
            },
            extractParam() {
                let that = this;
                this.paramRecommendInfos = [];
                this.param_recommend_infos.map((info) => {
                    if (info.method_name) {
                        that.paramRecommendInfos.push(info);
                    }
                });
            },
            extractVariable() {
                let that = this;
                this.variableRecommendInfos = [];
                this.param_recommend_infos.map((info) => {
                    if (!info.method_name) {
                        that.variableRecommendInfos.push(info);
                    }
                });
            },
            // 链接源文件和目录
            linkToPath(e) {
                let that = this;
                let link = e.target.getAttribute("data-link");
                this.isSpinning = true;
                this.set_current_path(link);
                if (link.indexOf(".") !== -1) {
                    // 如果是一个文件，则获取它的内容
                    that.get_file_content(link).then(() => {
                        Prism.highlightAll();
                        // that.get_param_recommend_by_filepath(link).then(() => {
                        //     that.splitParamAndVariable();
                        //     that.get_recommend_by_filepath(link).then(() => {
                        //         that.recommendInfos = that.recommend_infos;
                        //         that.$message.success("推荐获取成功");
                        //         that.isSpinning = false;
                        //     });
                        // });

                        that.get_all_recommends_by_filepath(link).then(() => {
                            that.methodBlockRecommends = that.method_block_recommends;
                            that.$message.success("推荐获取成功");
                            that.isSpinning = false;
                        });

                        that.set_current_name(link.split("/").slice(-1)[0]);
                        that.del_one_path();
                        that.add_one_path({
                            name: that.current_name,
                            path: that.current_path
                        });
                    });
                    that.set_file_type(true);
                } else {
                    // 如果是一个目录
                    that.get_dir_path(link).then(() => {
                        that.set_current_name(link.split("/").slice(-1)[0]);
                        that.add_one_path({
                            name: that.current_name,
                            path: that.current_path
                        });
                        that.clearDemonstrate();
                        that.changeDirectoryHeight();
                        that.isSpinning = false;
                    });
                    that.set_file_type(false);
                }
            },
            backToPath(e) {
                let that = this;
                let link = e.target.getAttribute("data-link");
                this.isSpinning = true;
                this.set_current_path(link);
                that.get_dir_path(link).then(() => {
                    that.set_current_name(link.split("/").slice(-1)[0]);
                    that.del_one_path();
                    that.clearDemonstrate();
                    that.changeDirectoryHeight();
                    that.isSpinning = false;
                });
                that.set_file_type(false);
            },
            selectToPath(e) {
                let that = this;
                let link = e.target.getAttribute("data-link");
                this.isSpinning = true;
                let i = 0;
                for (; i < this.current_path_list.length; i++) {
                    if (link === this.current_path_list[i].path) {
                        break;
                    }
                }
                that.get_dir_path(link).then(() => {
                    that.set_current_name(link.split("/").slice(-1)[0]);
                    that.set_current_path_list(that.current_path_list.slice(0, i + 1));
                    that.clearDemonstrate();
                    that.changeDirectoryHeight();
                    that.isSpinning = false;
                });
                that.set_file_type(false);
            },
            notice() {
                this.$message.info("暂不支持访问非java文件");
            },
            // 目录伸缩功能
            getNumberOfDirectoryLines() {
                return this.numberOfDirectoryLines = (this.current_path_list.length > 1 ? 1 : 0)
                    + this.file_to_demonstrate_paths.dirs.length
                    + this.file_to_demonstrate_paths.javaFiles.length
                    + this.file_to_demonstrate_paths.otherFiles.length;
            },
            changeDirectoryState() {
                this.isFold = !this.isFold;
                this.changeDirectoryHeight();
            },
            changeDirectoryHeight() {
                $("#caret-icon").css({"transform": "rotate(" + (-90) * (this.isFold ? 1 : 0) + "deg)"});
                let number_of_lines = this.getNumberOfDirectoryLines();
                if (this.isFold) {
                    $("#directory").css({"height": (number_of_lines > 5 ? 5 : number_of_lines) * 36 + "px"});
                } else {
                    $("#directory").css({"height": number_of_lines * 36 + "px"});
                }
            },
            // 返回顶部
            backToTop() {
                $("html,body").animate({scrollTop: 0}, 350);
                return false;
            },
            // 清空当前展示的推荐
            clearDemonstrate() {
                this.methodBlockRecommends = [];
            },
            // 筛选相关
            changeFilter() {
                // 改变filter栏的状态和filter图标的颜色
                this.isFilter = !this.isFilter;
                if (this.isFilter) {
                    $("#filter").css({"height": "145.3px"});
                    $(".recommend-filter-icon").css({"color": "#0969da"});
                } else {
                    $("#filter").css({"height": 0});
                    $(".recommend-filter-icon").css({"color": "#595959"});
                }
            },
            filterParamName() {
                if (this.filterOptions.paramNameRecommend) {
                    this.extractParam();
                } else {
                    this.paramRecommendInfos = [];
                }
            },
            filterVariableName() {
                if (this.filterOptions.variableNameRecommend) {
                    this.extractVariable();
                } else {
                    this.variableRecommendInfos = [];
                }
            },
            filterInfo() {
                this.splitParamAndVariable();
                let that = this;
                let tempParam = [];
                let tempVariable = [];
                for (let i = 0; i < this.paramRecommendInfos.length; i++) {
                    let tempInfo = this.paramRecommendInfos[i];
                    let resInfo = {
                        method_name: tempInfo.method_name,
                        param_name: tempInfo.param_name,
                        param_location: tempInfo.param_location,
                        possible_recommends: [],
                        recommends_distance: []
                    };
                    let isReturn = false;
                    for (let j = 0; j < tempInfo.possible_recommends.length; j++) {
                        if (that.displayItem(tempInfo.recommends_distance[j])) {
                            isReturn = true;
                            resInfo.possible_recommends.push(tempInfo.possible_recommends[j]);
                            resInfo.recommends_distance.push(tempInfo.recommends_distance[j]);
                        }
                    }
                    if (isReturn) {
                        tempParam.push(resInfo);
                    }
                }
                for (let i = 0; i < this.variableRecommendInfos.length; i++) {
                    let tempInfo = this.variableRecommendInfos[i];
                    let resInfo = {
                        param_name: tempInfo.param_name,
                        param_location: tempInfo.param_location,
                        possible_recommends: [],
                        recommends_distance: []
                    };
                    let isReturn = false;
                    for (let j = 0; j < tempInfo.possible_recommends.length; j++) {
                        if (that.displayItem(tempInfo.recommends_distance[j])) {
                            isReturn = true;
                            resInfo.possible_recommends.push(tempInfo.possible_recommends[j]);
                            resInfo.recommends_distance.push(tempInfo.recommends_distance[j]);
                        }
                    }
                    if (isReturn) {
                        tempVariable.push(resInfo);
                    }
                }
                this.paramRecommendInfos = tempParam;
                this.variableRecommendInfos = tempVariable;
            },
            displayItem(distance) {
                return (this.filterOptions.displaySuccess && distance === 1)
                    || (this.filterOptions.displayWarning && (distance < 1 && distance >= 0.3))
                    || (this.filterOptions.displayError && distance < 0.3);
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