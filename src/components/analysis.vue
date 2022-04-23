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
        </a-breadcrumb>
        <div class="code-block">
            <div class="code">
                <div class="code-title"><span>test.java</span></div>
                <pre class="line-numbers code-body"><code class="language-java">{{code}}</code></pre>
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
    import {SettingOutlined, CodeOutlined} from "@ant-design/icons-vue";

    export default {
        name: "analysis",
        components: {
            SettingOutlined,
            CodeOutlined
        },
        mounted() {
            Prism.highlightAll();
        },
        data() {
            return {
                content: "",
                code: "int x=10;\n" + "int y=x+10;\n"
            };
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