import Vue from "vue";
//  UI
import Vant from "vant";
import "vant/lib/index.css";
//  定制存储
import StorageClient from "@/libs/storage";
//  定制组件
import RGLoader from "@/components/RGLoader/index.vue";
import RGEval from "@/components/RGEval/index.vue";
import RGFooter from "@/components/RGFooter/index.vue";
//  站点配置
import globalConfig from "@/static/data/config";
import pinyin from "pinyin";
//  三方插件
import * as PDFJS from "pdfjs-dist";
PDFJS.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js";
//  剪贴板功能
import vueclipboard from "vue-clipboard2";

//  移动端调试器
// import VConsole from "vconsole";
// new VConsole();

export const storage: StorageClient = new StorageClient({
  storage: localStorage,
  lock: process.env.VUE_APP_CITY,
  clearTime: 3 * 60 * 60 * 1000,
});

export default (): void => {
  //  全局挂载
  Vue.prototype.storage = storage;
  Vue.prototype.pdfjs = PDFJS;
  Vue.prototype.pinyin = (str: string) => {
    return pinyin(str, {
      compact: true,
      style: pinyin.FIRST_LETTER,
    });
  };

  //  全局注册
  Vue.use(Vant);
  Vue.use(vueclipboard);
  Vue.component("RGLoader", RGLoader);
  Vue.component("RGEval", RGEval);
  Vue.component("RGFooter", RGFooter);

  storage.set("globalConfig", globalConfig[process.env.VUE_APP_CITY]);
};
