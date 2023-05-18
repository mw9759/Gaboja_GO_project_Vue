import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login_join",
    name: "login_join",
    component: () => import(/* webpackChunkName: "login_join" */ "@/views/LoginJoinForm.vue"),
  },
  {
    path: "/tripsearch",
    name: "tripsearch",
    component: () => import(/* webpackChunkName: "tripsearch" */ "@/views/TripSearchView.vue"),
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import(/* webpackChunkName: "QnA" */ "@/views/QnA.vue"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: () =>
          import(/* webpackChunkName: "QnA" */ "@/components/qna/QnAList"),
      },
      {
        path: "write",
        name: "qnawrite",
        component: () =>
          import(/* webpackChunkName: "QnA" */ "@/components/qna/QnAWrite"),
      },
    ]
  },
  {
    path: "/adminboard",
    name: "adminboard",
    component: () => import(/* webpackChunkName: "adminboard" */ "@/views/AdminBoard.vue"),
    redirect: "/adminboard/list",
    children: [
      {
        path: "list",
        name: "adminboardlist",
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardList"),
      },
      {
        path: "write",
        name: "adminboardwrite",
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardWrite"),
      },
      {
        path: "view/:articleNo",
        name: "adminboardview",
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardView"),
      },
      {
        path: "modify/:articleNo",
        name: "adminboardmodify",
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardModify"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
