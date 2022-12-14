import {
  VuexModule,
  Module,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import utils from "@/libs/utils";

// 属性一：module名称，开启命名空间后会以name为命名空间
// 属性二：是否使用动态加载，简而言之只有在用到当前的module才会加载，详细可以看vuex官网。
// 属性三：是否开启命名空间，如果你的模块很多，强烈建议开启
// 属性四：挂载的store目标
@Module({ namespaced: true, name: "user", dynamic: true, store })
export default class User extends VuexModule {}

export const UserModule = getModule(User);
