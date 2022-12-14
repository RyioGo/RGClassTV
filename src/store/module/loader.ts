import { VuexModule, Module, Mutation } from "vuex-module-decorators";

import utils from "@/libs/utils";

// 属性一：module名称，开启命名空间后会以name为命名空间
// 属性二：是否使用动态加载，简而言之只有在用到当前的module才会加载，详细可以看vuex官网。
// 属性三：是否开启命名空间，如果你的模块很多，强烈建议开启
// 属性四：挂载的store目标
@Module({ namespaced: true, name: "loader" })
export default class Loader extends VuexModule {
  public message = "加载完成！";
  public show = false;

  @Mutation
  public setOption(data: boolean | string): void {
    switch (utils.typeOf(data)) {
      case "boolean":
        this.show = data as boolean;
        this.message = data ? "加载中..." : "加载完成！";
        break;
      case "string":
        this.message = data as string;
        this.show = true;
        break;
      default:
        throw new Error(
          "进行loader/setOption提交方法：输入类型必须为 string or boolean"
        );
    }
  }
}
