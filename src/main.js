//导入全局模块
import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookie from "vue-cookies";
import Antd from "ant-design-vue";
import $ from "jquery";
import "ant-design-vue/dist/antd.css";

import "highlight.js/styles/atom-one-light.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueCookie)
    .use(Antd)
    .use(VueAxios, axios)
    // .use(hljsVuePlugin)
    .mount("#app");

export default {
    app
};