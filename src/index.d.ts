import storage from "@/libs/storage";
import pinyin from "pinyin";
declare module "vue/types/vue" {
  interface Vue {
    storage: storage;
    pinyin: pinyin;
  }
}
