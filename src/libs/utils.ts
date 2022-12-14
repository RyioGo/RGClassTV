class UtilsClient {
  //  校验数据类型
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeOf(data: any): string {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
}

export default new UtilsClient();
