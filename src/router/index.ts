import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { constantRouterMap } from "@/config/router.config"
import Login from "@/views/user/Login.vue";

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "Login",
//     component: Login,
//   },
//   {
//     path: "/main",
//     name: "Main",
//     component: () => import("../views/Main.vue"),
//   },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue"),
//   },
// ];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as unknown as RouteRecordRaw[],
});

export default router;
