import { RouteConfig } from "vue-router";
import Home from "@/views/Home/index.vue";

const baseRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login/index.vue"),
  },
];

export default baseRoutes;
