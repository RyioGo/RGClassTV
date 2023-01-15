import storage from "@/libs/storage";
import pinyin from "pinyin";
import * as PDFJS from "pdfjs-dist";
declare module "vue/types/vue" {
  interface Vue {
    storage: storage;
    pinyin: pinyin;
    pdfjs: PDFJS;
  }
}
