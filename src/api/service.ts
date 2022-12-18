import { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpClient from "@/libs/axios";
import { Notify } from "vant";

const RGApi: HttpClient = new HttpClient(defaultConfig(), {
  UseRequest,
  UseResponse,
});
//  客户端请求配置
function defaultConfig(): AxiosRequestConfig {
  const { NODE_ENV, VUE_APP_BASE_API, VUE_APP_API } = process.env;

  const baseURL = NODE_ENV == "development" ? VUE_APP_BASE_API : VUE_APP_API;

  const timeout = 1000 * 12;

  return {
    baseURL,
    timeout,
  };
}

//  请求拦截器
function UseRequest(config: AxiosRequestConfig) {
  if (config.method == "post") {
    config.headers = Object.assign({}, config.headers, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  }
  return config;
}
//  响应拦截器
function UseResponse(response: AxiosResponse) {
  if (response.status == 200) {
    return response.data;
  } else {
    Notify({ type: "danger", message: "已拦截本次异常请求！" });
  }
}

export default RGApi;
