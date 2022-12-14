import storage from "@/libs/storage";

declare module "vue/types/vue" {
  interface Vue {
    storage: storage;
  }
}
