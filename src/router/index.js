import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

Vue.use(VueRouter);
// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login_join" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

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
    path: "/mypage",
    name: "mypage",
    component: () => import(/* webpackChunkName: "my_page" */ "@/views/Mypage.vue"),
    redirect: "/userBoard/list",
    children: [
      {
        path: "myProfile",
        name: "Profile",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "my_page" */ "@/components/mypage/myProfile"),
      },
    ]
  },
  {
    path: "/tripsearch",
    name: "tripsearch",
    
    component: () => import(/* webpackChunkName: "tripsearch" */ "@/views/TripSearchView.vue"),
  },
  {
    path: "/userBoard",
    name: "userBoard",
    component: () => import(/* webpackChunkName: "userBoard" */ "@/views/UserBoard.vue"),
    redirect: "/userBoard/list",
    children: [
      {
        path: "list",
        name: "userboardlist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "userBoard" */ "@/components/userboard/UserBoardList"),
      },
      {
        path: "write",
        name: "userboardwrite",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "userBoard" */ "@/components/userboard/UserBoardWrite"),
      },
      {
        path: "modify",
        name: "userboardmodify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "userBoard" */ "@/components/userboard/UserBoardModify"),
      },
    ],
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
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "QnA" */ "@/components/qna/QnAList"),
      },
      {
        path: "write",
        name: "qnawrite",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "QnA" */ "@/components/qna/QnAWrite"),
      },
      {
        path: "modify",
        name: "qnamodify",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "QnA" */ "@/components/qna/QnAModify"),
      },
    ],
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
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardWrite"),
      },
      {
        path: "view/:articleNo",
        name: "adminboardview",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardView"),
      },
      {
        path: "modify/:articleNo",
        name: "adminboardmodify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "adminboard" */ "@/components/adminboard/AdminBoardModify"),
      },
    ],
  },
  {
    path: "/travelplan",
    name: "travelplan",
    component: () => import(/* webpackChunkName: "travelplan" */ "@/views/TravelPlanView.vue"),
    redirect: "/travelplan/list",
    children: [
      {
        path: "list",
        name: "travelplanlist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "travelplan" */ "@/components/travelplan/TravelPlanList"),
      },
      {
        path: "view",
        name: "travelplanview",
        component: () =>
          import(/* webpackChunkName: "travelplan" */ "@/components/travelplan/TravelPlanView"),
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
