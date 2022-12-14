import Vue from "vue";
import Vuex from "vuex";
import loaderModule from "@/store/module/loader";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader: loaderModule,
  },
});
