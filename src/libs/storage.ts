interface options {
  storage: Storage;
  lock: string;
  clearTime: number;
}

class StorageClient {
  // 时，分，秒，毫秒。共计存储时间，默认3小时
  private clearTime = 3 * 60 * 60 * 1000;
  // 存储前置名称
  private lock = "";
  // 存储类型
  private storage: Storage;

  constructor(options: options) {
    this.storage = options.storage;
    this.lock = options.lock;
    this.clearTime = options.clearTime;
  }

  /**
   * @description 处理存储数据的前缀
   * @param {key: string}
   */
  private GetKey(key: string): string {
    return `${this.lock}${key}`.toUpperCase();
  }

  /**
   * @description 存储值
   * @param {key: string, value: any, expire: number }
   * */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public set(key: string, value: any, expire: number = this.clearTime): void {
    this.storage.setItem(
      this.GetKey(key),
      JSON.stringify({
        value,
        expire: Date.now() + expire,
      })
    );
  }
  /**
   * @description 清除值
   * @param {key: string}
   * */
  public remove(key: string): void {
    this.storage.removeItem(this.GetKey(key));
  }

  /**
   * @description 获取值
   * @param {key: string, def: any}
   * */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get(key: string, def = null): any | null {
    try {
      const data = this.storage.getItem(this.GetKey(key));
      if (data && data.length) {
        const { value, expire } = JSON.parse(data);
        if (expire === null || expire >= Date.now()) {
          return value;
        } else {
          this.remove(key);
        }
      }
    } catch (error) {
      return def;
    }
  }
  /**
   * @description 清空storage
   * */
  public clear(): void {
    this.storage.clear();
  }
}

export default StorageClient;
