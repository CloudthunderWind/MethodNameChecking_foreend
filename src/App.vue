<template>
    <config-provider :locale="locale">
        <div id="app_x">
            <router-view v-slot="{Component,route}">
                <transition name="fade" mode="out-in">
                    <component :is="Component" v-bind="route.params"></component>
                </transition>
            </router-view>
        </div>
    </config-provider>
</template>

<script>
    import zh_CN from "ant-design-vue/es/locale/zh_CN";
    import dayjs from "dayjs";
    import "dayjs/locale/zh-cn";
    import {ConfigProvider} from "ant-design-vue";

    dayjs.locale("zh-cn");

    export default {
        name: "App",
        mounted() {
        },
        provide() {
            return {};
        },
        components: {
            ConfigProvider
        },
        data() {
            return {
                locale: zh_CN
            };
        },
        methods: {}
    };
</script>

<style scoped>
    @import "assets/styles/wrapper.css";

    #app_x {
        margin: 0;
        height: 100%;
    }

</style>