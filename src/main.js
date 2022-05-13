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

import Prism from "prismjs";
//markdown前端展示插件
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import createLineNumberPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";

VMdPreview.use(githubTheme, {Prism})
    .use(createLineNumberPlugin())
    .use(createCopyCodePlugin());

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueCookie)
    .use(Antd)
    .use(VueAxios, axios)
    .use($)
    .use(VMdPreview)
    .mount("#app");

export default {
    app
};