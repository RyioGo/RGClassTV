/* eslint-disable @typescript-eslint/no-explicit-any */
import RGApi from "@/api/service";
import utils from "@/libs/utils";
import { storage } from "@/libs/plugin";
import { UserModule } from "@/store/module/user";
import { Notify } from "vant";

export default {
  getUserInfo(): void {
    //  在vuex存储中存在登录信息则禁止重复请求
    if (UserModule.isLogin == false) {
      const ticket: string = utils.GetRequest().auth_token;
      const appid: string = utils.GetRequest().appid;
      RGApi.request({
        method: "post",
        url: storage.get("globalConfig").userUrl,
        data: {
          ticket,
          appid,
        },
      }).then((res: any) => {
        if (res && res.succ) {
          UserModule.setOption({
            token: res.token,
            name: res.data.name,
            idCard: res.data.cardid,
            phone: res.data.mobile,
            sex: res.data.sex,
            appid: appid,
          });
          //this.getEnterprise();
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      });
    }
  },
  getToken(url: string): void {
    RGApi.request({
      method: "post",
      url: storage.get("globalConfig").tokenUrl,
      data: {
        token: UserModule.userInfo.token,
      },
    }).then((res: any) => {
      if (res.result) {
        window.location.href =
          url +
          `?appid=${storage.get("globalConfig").appid}&auth_token=${
            res.ticket
          }`;
      } else {
        Notify({
          type: "warning",
          message: "用户身份已过期，请稍后重新访问此应用！",
        });
      }
    });
  },
};
