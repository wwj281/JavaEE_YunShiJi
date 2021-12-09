import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/components/login"),
  },
  {
    path: "/answer",
    name: "About",
    component: () => import("@/components/student/answer"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("@/components/signUp"),
  },
  // dch新增加
  {
    path: "/teacherPage",
    component: () =>
      import("@/components/teacher/teacher_background/background"),

    // 二级路由
    children: [
      // 题库模块
      // 整理题库
      {
        path: "/manageBank", //首页默认路由
        component: () =>
          import("@/components/teacher/question_bank/manageBank"),
      },
      // 扩充题库
      {
        path: "/addBank", //首页默认路由
        component: () => import("@/components/teacher/question_bank/addBank"),
      },

      // 测试
      {
        path: "/test1", //首页默认路由
        component: () => import("@/components/teacher/test1"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
