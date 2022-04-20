import {createRouter, createMemoryHistory} from "vue-router";


// 配置路由信息
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        /** @param path 链接路径
         * @param name 路由名称
         * @param component 映射的组件
         * @param props 组件参数(与router解耦)
         * @param redirect 跳转路径
         * @param child 嵌套路由信息
         */
        {
            path: "/",
            name: "login",
            meta: {},
            component: () => import("../views/login")
        },
        {
            path: "/home",
            name: "home",
            meta: {},
            component: () => import("../views/home"),
            children: [
                {
                    path: "workbench",
                    name: "workbench",
                    component: () => import("../components/workbench")
                },
                {
                    path: "analysis",
                    name: "analysis",
                    component: () => import("../components/analysis")
                }
            ]
        }
    ]
});



export default router;
