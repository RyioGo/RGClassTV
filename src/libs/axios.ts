import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

//  请求拦截器的数据类型
interface interceptors {
  UseRequest: (arg: AxiosRequestConfig) => AxiosRequestConfig;
  UseResponse: (arg: AxiosResponse) => AxiosResponse;
  UseError: (arg: AxiosError) => Promise<AxiosError>;
}

class HttpClient {
  public request: AxiosInstance;

  constructor(options: AxiosRequestConfig, interceptors: interceptors) {
    // 创建axios实例
    this.request = axios.create(options);
    // 初始化拦截器
    this.interceptors(interceptors);
  }

  private interceptors(interceptors: interceptors) {
    this.request.interceptors.request.use(
      (config: AxiosRequestConfig): any => {
        return interceptors.UseRequest(config);
      },
      (error: AxiosError) => {
        return interceptors.UseError(error);
      }
    );

    // 响应拦截器
    this.request.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse) => {
        return interceptors.UseResponse(response);
      },
      // 请求失败
      (error: AxiosError) => {
        return interceptors.UseError(error);
      }
    );
  }
}

export default HttpClient;
