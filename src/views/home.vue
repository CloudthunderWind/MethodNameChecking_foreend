<template>
    <div class="block-wrapper">
        <div class="top-bar-wrapper">
            <div class="top-bar">
                <span class="title">函数名分析与推荐在线工具</span>
                <a-popover trigger="click">
                    <template #content>
                        <div class="user-info">你好！User</div>
                        <a-button type="primary" danger>退出登录</a-button>
                    </template>
                    <a-avatar shape="square" style="cursor: pointer">User</a-avatar>
                </a-popover>
            </div>
        </div>
        <div class="flex-content-wrapper">
            <div class="menu-wrapper">
                <a-menu mode="inline"
                        class="bench-menu"
                        @select="goToPage">
                    <a-menu-item key="/workbench">
                        <code-outlined/>
                        <span>工作台</span>
                    </a-menu-item>
                    <a-menu-item key="/analysis">
                        <code-sandbox-outlined/>
                        <span>代码分析报告</span>
                    </a-menu-item>
                </a-menu>
            </div>
            <div class="bench-wrapper">
                <router-view v-slot="{Component,route}">
                    <keep-alive>
                        <component :is="Component" v-bind="route.params"></component>
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>

</template>

<script>
    import {CodeSandboxOutlined, CodeOutlined} from "@ant-design/icons-vue";

    export default {
        name: "home",
        components: {
            CodeSandboxOutlined,
            CodeOutlined
        },
        data() {
            return {};
        },
        mounted() {
            document.title = "工作台";
            this.$router.push("workbench");
        },
        computed: {},
        methods: {
            goToPage(element) {
                this.$router.push("" + element.key);
            }
        }
    };
</script>

<style scoped>
    @import "../assets/styles/wrapper.css";
    @import "../assets/styles/home.css";
</style>