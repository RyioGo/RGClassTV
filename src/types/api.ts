/* eslint-disable @typescript-eslint/no-explicit-any */
export interface signParamsType {
  app_id: string;
  interface_id: string;
  version: string;
  header: string;
  biz_content: string;
  charset: string;
  timestamp: number;
  //来源0：PC；1：APP；2：支付宝；3：微信
  origin: string;
  sign?: string;
}

export interface defaultDataType<T = any, Y = any> {
  (a: string, b: T, c?: Y): signParamsType;
}
