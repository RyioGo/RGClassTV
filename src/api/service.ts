import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import HttpClient from "@/libs/axios";
import { Notify } from "vant";

import store from "@/store";

const RGApi: HttpClient = new HttpClient(defaultConfig(), {
  UseRequest,
  UseResponse,
  UseError,
});

//  客户端请求配置
function defaultConfig(): AxiosRequestConfig {
  const { NODE_ENV, VUE_APP_BASE_API, VUE_APP_API } = process.env;

  const baseURL = NODE_ENV == "development" ? VUE_APP_BASE_API : VUE_APP_API;

  const timeout = 1000 * 24;

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
//  异常拦截器
function UseError(error: AxiosError) {
  store.commit("loader/setOption", false);
  Notify({ type: "danger", message: "请求超时！" });
  return Promise.reject(error);
}

export default RGApi;
