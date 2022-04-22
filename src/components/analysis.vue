<template>
    <div class="analysis-wrapper">
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
    import {SettingOutlined} from "@ant-design/icons-vue";

    export default {
        name: "analysis",
        components: {
            SettingOutlined
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