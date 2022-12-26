import { RouteConfig } from "vue-router";
import Home from "@/views/Home/index.vue";

const baseRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/select",
    name: "select",
    component: () =>
      import(/* webpackChunkName: "select" */ "@/views/Select/index.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "@/views/Detail/index.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () =>
      import(/* webpackChunkName: "form" */ "@/views/Form/index.vue"),
  },
  {
    path: "/submit",
    name: "submit",
    component: () =>
      import(/* webpackChunkName: "submit" */ "@/views/Submit/index.vue"),
  },
];

export default baseRoutes;
