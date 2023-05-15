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
    component: () => import("@/views/TripSearchView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
