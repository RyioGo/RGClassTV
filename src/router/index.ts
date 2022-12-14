import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";

import baseRoutes from "@/router/base";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = baseRoutes;

const router = new VueRouter({
  mode: "hash",
  base: "" || "/" + process.env.VUE_APP_VERSION,
  routes,
});

router.beforeEach((to: Route, from: Route, next) => {
  next();
});

router.afterEach((to: Route, from: Route) => {
  console.log(to, from);
});

export default router;
