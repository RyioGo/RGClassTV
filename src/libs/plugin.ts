import Vue from "vue";
//  UI
import Vant from "vant";
import "vant/lib/index.css";
//  定制存储
import StorageClient from "@/libs/storage";
//  定制组件
import RGLoader from "@/components/RGLoader/index.vue";
import RGFooter from "@/components/RGFooter/index.vue";
//  站点配置
import globalConfig from "@/static/data/config";
//  移动端调试器
import VConsole from "vconsole";
new VConsole();

export const storage: StorageClient = new StorageClient({
  storage: sessionStorage,
  lock: process.env.VUE_APP_CITY,
  clearTime: 3 * 60 * 60 * 1000,
});

export default (): void => {
  //  全局挂载
  Vue.prototype.storage = storage;

  //  全局注册
  Vue.use(Vant);
  Vue.component("RGLoader", RGLoader);
  Vue.component("RGFooter", RGFooter);

  storage.set("globalConfig", globalConfig[process.env.VUE_APP_CITY]);
};
