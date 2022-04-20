<template>
    <div class="block-wrapper">
        <div class="top-bar-wrapper">
            <div class="top-bar">
                <span class="title">函数名分析与推荐在线工具</span>
            </div>
        </div>
        <div class="flex-content-wrapper">
            <div class="menu-wrapper">
                <a-menu mode="inline"
                        class="bench-menu"
                        @select="goToPage">
                    <a-menu-item key="/workbench">
                        <span>工作台</span>
                    </a-menu-item>
                    <a-menu-item key="/analysis">
                        <span>代码分析</span>
                    </a-menu-item>
                </a-menu>
            </div>
            <div class="bench-wrapper">
                <router-view v-slot="{Component,route}">
                    <component :is="Component" v-bind="route.params"></component>
                </router-view>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "home",
        components: {},
        data() {
            return {};
        },
        mounted() {
            document.title = "工作台";
        },
        computed: {},
        methods: {
            goToPage(element) {
                this.$router.push("/home" + element.key);
            }
        }
    };
</script>

<style scoped>
    @import "../assets/styles/wrapper.css";
    @import "../assets/styles/home.css";
</style>