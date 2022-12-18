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
  //压缩方法
  dealImage(base64: string, w: number, callback: (arg: string) => void) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newImage: any = new Image();
    let quality = 0.9; //压缩系数0-1之间
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
    let imgWidth, imgHeight;
    newImage.onload = function () {
      imgWidth = this.width;
      imgHeight = this.height;
      const canvas = document.createElement("canvas");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx: any = canvas.getContext("2d");
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w;
          canvas.height = (w * imgHeight) / imgWidth;
        } else {
          canvas.height = w;
          canvas.width = (w * imgWidth) / imgHeight;
        }
      } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.6;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
      //如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
      /*       while (base64.length / 1024 > 150) {
        quality -= 0.01;
        base64 = canvas.toDataURL("image/jpeg", quality);
      }
      //防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
      while (base64.length / 1024 < 50) {
        quality += 0.001;
        base64 = canvas.toDataURL("image/jpeg", quality);
      } */
      callback(base64); //必须通过回调函数返回，否则无法及时拿到该值
    };
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
}

export default new UtilsClient();
