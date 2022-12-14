import { AxiosRequestConfig, AxiosResponse } from "axios";
import HttpClient from "@/libs/axios";

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
  return config;
}
//  响应拦截器
function UseResponse(response: AxiosResponse) {
  return response;
}

export default RGApi;
