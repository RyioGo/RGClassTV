import Vue from "vue";

import storage from "@/libs/storage";

import RGLoader from "@/components/RGLoader/index.vue";

export default (): void => {
  //  全局挂载
  Vue.prototype.storage = new storage({
    storage: sessionStorage,
    lock: process.env.VUE_APP_NAME,
    clearTime: 3 * 60 * 60 * 1000,
  });
  //  全局注册
  Vue.component("RGLoader", RGLoader);
};
