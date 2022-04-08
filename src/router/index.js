import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 配置路由信息
const routes = [
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
        meta: {
            title: "银保监会文书检索"
        },
        component: () => import("../views/login")
    },
    {
        path: "/home",
        name: "home",
        meta: {
            title: "银保监会信息查询系统"
        },
        component: () => import("../views/home")
    }
];

// 新建路由方法
const createRouter = () => new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: routes
});

// 重置路由方法
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;// reset router
}

const router = createRouter();

export default router;
