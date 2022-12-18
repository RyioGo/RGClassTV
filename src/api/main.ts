/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import RGApi from "@/api/service";
import { storage } from "@/libs/plugin";
import { Notify } from "vant";

import { signParamsType, defaultDataType } from "@/types/api";

export default {
  getSign(params: signParamsType): Promise<any> {
    return RGApi.request({
      method: "post",
      url: storage.get("globalConfig").signUrl,
      data: params,
    });
  },
  async getGate(key: string, params: any, headers?: any): Promise<any> {
    //  配置赣服通参数
    const data = defaultData(key, params);
    //  获取赣服通签名
    try {
      const res = await this.getSign(data);
      data.sign = res.data.sign;
      return RGApi.request({
        method: "post",
        url: storage.get("globalConfig").gateUrl,
        data,
        headers,
      });
    } catch (error) {
      Notify({ type: "warning", message: "验签未通过，请稍后重试！" });
    }
  },
};

const defaultData: defaultDataType = (
  key,
  data,
  header = {
    "Content-Type": "application/x-www-form-urlencoded",
  }
) => {
  return {
    app_id: storage.get("globalConfig").appid,
    interface_id: key,
    version: process.env.VUE_APP_VERSION,
    header: JSON.stringify(header),
    biz_content: JSON.stringify(data),
    charset: "UTF-8",
    timestamp: Date.now(),
    //来源0：PC；1：APP；2：支付宝；3：微信
    origin: "2",
  };
};
