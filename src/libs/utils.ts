/* eslint-disable @typescript-eslint/no-explicit-any */
import { toEvalOptionsType } from "@/types/utils";

class UtilsClient {
  //  校验数据类型
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeOf(data: any): string {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  }
  toEval(options: toEvalOptionsType) {
    const { appCode, appName, appRegCode, appRegName, abilityCode, organCode } =
      options;
    const params = `appCode=${appCode}&appName=${appName}&regionCode=${appRegCode}&regionName=${appRegName}&abilityCode=${abilityCode}&organCode=${organCode}`;
    window.location.href =
      "https://ganfutong.jiangxi.gov.cn/jmopen/webapp/html5/gfttyfwpj/index.html?" +
      params;
  }
  GetRequest() {
    const url = decodeURI(window.location.search);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theRequest: any = new Object();
    if (url.indexOf("?") != -1) {
      const str: string = url.substr(1);
      const strs: Array<string> = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
      }
    }
    return theRequest;
  }
  getStr(beginLen: number, endLen: number, max = 999) {
    // 这里用了闭包，闭包用完后需手动释放内存
    return function (str: string) {
      const firstStr = str.substr(0, beginLen);
      const lastStr = endLen == 0 ? "" : str.substr(endLen);
      let repeatNum = Math.max(0, str.length - (beginLen + Math.abs(endLen)));
      repeatNum = Math.min(max, repeatNum);
      const middleStr = "*".repeat(repeatNum);
      return firstStr + middleStr + lastStr;
    };
  }
  getName(str: string) {
    let getResult = null;
    switch (str.length) {
      case 1:
      case 2:
        getResult = this.getStr(1, 0);
        break;
      default:
        getResult = this.getStr(1, 0);
        break;
    }
    const result = getResult(str);
    getResult = null; // 闭包-需手动释放
    return result;
  }
  getIdCard(id: string) {
    let getResult = null;
    getResult = this.getStr(1, -1);
    const idCard = getResult(id);
    getResult = null; // 闭包-需手动释放
    return idCard;
  }
  getPhone(phone: string) {
    let getResult = null;
    getResult = this.getStr(1, -2);
    const tel = getResult(phone);
    getResult = null; // 闭包-需手动释放
    return tel;
  }

  /**
   * 图片压缩和尺寸裁剪
   * @param base64        {base64}      图片文件
   * @param quality       {Number}    生成图片质量，0.0~1.0之间，质量越小、文件越小、图片越模糊
   * @param callback      {Function}  回调方法，参数为原文件(小于阈值的情况下)或压缩后的新文件
   * @param targetWidth   {Number}    [可选]生成图片的宽度，单位：px，默认800
   * @param targetHeight  {Number}    [可选]生成图片的高度，单位：px，默认值按宽度自适应获取
   */
  dealImage(
    base64: string,
    callback: (arg0: any) => void,
    quality = 0.7,
    targetWidth = 800,
    targetHeight = null
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const image = new Image();
    image.src = base64;
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const scale = this.width / this.height;
      canvas.width = targetWidth;
      canvas.height = targetHeight || targetWidth / scale;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png", quality);
      const newFile = that.base64ToFile(dataURL, Date.now() + "png");
      callback(newFile);
    };
  }

  /**
   * Base64转File
   * @param dataURL   {String}  base64
   * @param fileName	{String}  文件名
   * @param mimeType	{String}  [可选]文件类型，默认为base64中的类型
   * @returns {File}
   */
  base64ToFile(dataURL: string, fileName: string, mimeType = null) {
    const arr = dataURL.split(",");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultMimeType = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mimeType || defaultMimeType });
  }
}

export default new UtilsClient();
