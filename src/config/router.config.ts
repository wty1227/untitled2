import UserLayout from "@/views/layouts/UserLayout.vue";

export const constantRouterMap = [
  {
    path: "/user",
    component: UserLayout,
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/user/Login.vue"),
      },
    ],
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/Main.vue"),
  }
];
