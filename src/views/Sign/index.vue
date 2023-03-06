<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<script lang="ts">
//  for node_modules api
import { Component, Vue } from "vue-property-decorator";

//  for you api
import gftApi from "@/api/main";
import utils from "@/libs/utils";
import { UserModule } from "@/store/module/user";
//  for you ts
//  for you components
import RGHeader from "@/components/RGHeader/index.vue";

@Component({
  components: {
    RGHeader,
  },
})
export default class SignView extends Vue {
  //  pdf渲染表单列表
  public pdfForms = this.storage.get("forms");
  //  待展示转化pdf base64 列表
  public pdfView: any = {};
  //  手风琴激活key
  public collapse = this.storage.get("forms")[0].path;
  //  全屏预览
  public isFall = false;
  //  创建成功的用户id
  public accountId = this.storage.get("saveData")?.accountId || "";
  //  签署文档返回到key值
  public fileKeys: any = this.storage.get("saveData")?.fileKeys || {};
  //  签章流程id
  public signFlowId = this.storage.get("saveData")?.signFlowId || "";
  //  pdf数据集合
  public pdfDoc = {
    doc: null,
    pages: 0,
  };
  //  签章后文档地址
  downUrl: string[] = [];

  //  站点副标题
  public get subTitle(): string {
    return this.storage.get("selectData").flowName + "业务签章流程";
  }

  //  创建个人签章用户
  private async createUserPer() {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzcjgr;
    this.$store.commit("loader/setOption", "创建电子签章用户...");
    const res = await gftApi.getGate(interface_id, {
      loginMobile: UserModule.userInfo.phone,
      name: UserModule.userInfo.name,
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.accountId = res.data.data.substring(
          res.data.data.indexOf("=") + 1,
          res.data.data.indexOf("}")
        );
      } else {
        //  原接口
        this.$notify({ type: "warning", message: res.data.message });
      }
    } else {
      //  赣服通
      this.$notify({ type: "warning", message: res.msg });
    }
    this.$store.commit("loader/setOption", false);
  }
  //  创建企业签章用户
  private async createUserEnr() {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzcjqy;
    this.$store.commit("loader/setOption", "创建电子签章用户...");
    const res = await gftApi.getGate(interface_id, {
      filePath: "/data/" + this.storage.get("filePath"),
      map: this.storage.get("form"),
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
    }
  }
  //  调用生成pdf直链
  private async wordToPdf(item: any) {
    let interface_id: string = this.storage.get("globalConfig").apis.wordToPdf;
    this.$store.commit("loader/setOption", "生成PDF文件...");

    const res = await gftApi.getGate(
      interface_id,
      {
        filePath: "/data/" + item.path + item.type,
        map: item.form,
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        //  拼接base64 头
        let base64: string = "data:application/pdf;base64," + res.data.data;
        //  base64 转换 file
        let file: File = utils.base64ToFile(base64, item.path + ".pdf");

        //  转换后将file文件自动上传签章流程
        if (!this.storage.get("saveData")) {
          this.upSignPDF(file, item.path);
        }

        this.pdfView[item.path] = base64;

        if (item.path == this.collapse) {
          this._loadFile(base64, this.collapse);
        }
      } else {
        //  原接口
        this.$notify({ type: "warning", message: res.data.message });
      }
    } else {
      //  赣服通
      this.$notify({ type: "warning", message: res.msg });
    }
    this.$store.commit("loader/setOption", false);
  }
  //  上传签章文档
  private async upSignPDF(file: File, name: string) {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzwjzc;
    this.$store.commit("loader/setOption", "上传待签章文件...");
    const res = await gftApi.getFile(interface_id, file);
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.fileKeys[name] = res.data.data.substring(
          res.data.data.indexOf("=") + 1,
          res.data.data.indexOf(",")
        );
      } else {
        //  原接口
        this.$notify({ type: "warning", message: res.data.message });
      }
    } else {
      //  赣服通
      this.$notify({ type: "warning", message: res.msg });
    }
    this.$store.commit("loader/setOption", false);
  }
  //  创建签章流程
  public async createSignFlow() {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzcjlc;
    this.$store.commit("loader/setOption", "创建签章业务...");
    const res = await gftApi.getGate(interface_id, {
      subject: this.storage.get("selectData").flowName,
      redirectUrl: window.location.href + "sign",
      signDocs: this.pdfForms.map((item: any) => {
        return {
          docFilekey: this.fileKeys[item.path],
          docName: item.path,
        };
      }),
      signers: [
        {
          accountId: this.accountId,
          accountType: 2,
          signDocDetails: this.pdfForms.map((item: any) => {
            return {
              docFilekey: this.fileKeys[item.path],
              signPos: [
                {
                  key: "权利人",
                  signType: 0,
                },
              ],
            };
          }),
        },
      ],
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.signFlowId = res.data.data.substring(
          res.data.data.indexOf("=") + 1,
          res.data.data.indexOf(",")
        );
        let storage: any = {
          itemName: this.storage.get("selectData").flowName,
          accountId: this.accountId,
          fileKeys: this.fileKeys,
          signFlowId: this.signFlowId,
        };
        Object.keys(window.localStorage).forEach((item: string) => {
          if (item.includes(process.env.VUE_APP_CITY)) {
            storage[item] = this.storage.get(
              item.substring(process.env.VUE_APP_CITY.length)
            );
          }
        });
        delete storage.userInfo;

        this.storage.set("saveData", storage);

        this.$dialog
          .alert({
            title: "已创建签章流程",
            message: `提示：即将前往签章站点，\n并且稍后将会发送短信至${UserModule.forPhone}。`,
            theme: "round-button",
          })
          .then(() => {
            window.location.href = res.data.data.substring(
              res.data.data.indexOf("signUrl=") + 8,
              res.data.data.indexOf(", signUrlBase64=")
            );
          });
      } else {
        //  原接口
        this.$notify({ type: "warning", message: res.data.message });
      }
    } else {
      //  赣服通
      this.$notify({ type: "warning", message: res.msg });
    }
    this.$store.commit("loader/setOption", false);
  }
  //  签署文档下载
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async downSignPDF(signFlowId = "") {
    if (signFlowId == "") {
      this.$notify({ type: "warning", message: "请先进行我要签章办理。" });
      return;
    }
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzqswd;
    this.$store.commit("loader/setOption", "获取下载链接...");
    const res = await gftApi.getGate(interface_id, {
      signFlowId,
    });
    this.$store.commit("loader/setOption", false);
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        let strUrls = res.data.data.split("downloadDocUrl=");

        strUrls.forEach((item: string, index: number) => {
          if (index) {
            this.downUrl.push(item.split(", finishFileKey")[0]);
          }
        });
      } else {
        //  原接口
        this.$notify({ type: "warning", message: res.data.message });
      }
    } else {
      //  赣服通
      this.$notify({ type: "warning", message: res.msg });
    }
  }
  //  签署文档进度更新
  public async updateSign(signFlowId: string) {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzjdxq;
    const res = await gftApi.getGate(interface_id, {
      signFlowId,
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
    }
  }
  //  前往材料页
  public toPath() {
    this.$router.push({
      name: "submit",
    });
  }
  //  切换pdf文档
  toggleWordToPdf(key: string) {
    if (key) this._loadFile(this.pdfView[key], key);
  }
  //  复制下载地址
  copyLink(url: string) {
    // 签章成功后弹窗提示
    this.$copyText(url).then(
      () => {
        this.$notify({ type: "success", message: "复制成功！" });
      },
      () => {
        this.$notify({
          type: "warning",
          message: "复制失败，请重新获取文档地址。",
        });
      }
    );
  }
  //  加载pdf文件
  _loadFile(url: string, key: string) {
    this.pdfjs.getDocument(url).promise.then((pdf: any) => {
      this.pdfDoc.doc = pdf;
      this.pdfDoc.pages = pdf.numPages;
      this.$nextTick(() => {
        this._renderPage(1, key);
      });
    });
  }
  //  渲染pdf至canvas画板
  _renderPage(num: number, key: string) {
    (this.pdfDoc.doc as any).getPage(num).then((page: any) => {
      let canvas = document.getElementById(
        "pdf-view" + key + "" + num + ""
      ) as HTMLCanvasElement;
      var vp = page.getViewport({ scale: 1 });
      let ctx = canvas.getContext("2d") as any;
      let dpr = window.devicePixelRatio || 1;
      let bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
      let ratio = dpr / bsr;
      let viewport = page.getViewport({ scale: window.innerWidth / vp.width });
      canvas.width = viewport.width * ratio;
      canvas.height = viewport.height * ratio;
      canvas.style.width = viewport.width - 32 + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      let renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      page.render(renderContext);
      if (this.pdfDoc.pages > num) {
        this._renderPage(num + 1, key);
      }
    });
  }
  private created() {
    //  调用生成pdf文件
    this.pdfForms.forEach((item: any) => {
      this.wordToPdf(item);
    });

    this.createUserPer();
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader :subTitle="subTitle" />
    <div class="main">
      <van-collapse v-model="collapse" accordion @change="toggleWordToPdf">
        <van-collapse-item
          v-for="(item, index) in pdfForms"
          :key="index"
          :title="item.path"
          :name="item.path"
        >
          <div
            class="doc"
            :class="{ 'doc-open': isFall && item.path == collapse }"
            v-if="pdfDoc.pages"
            @click="isFall = !isFall"
          >
            <canvas
              class="pdf-view"
              v-for="page in pdfDoc.pages"
              :id="'pdf-view' + item.path + page"
              :key="page"
            />
          </div>
          <van-empty description="加载文档..." v-else />
        </van-collapse-item>
      </van-collapse>
      <van-cell-group class="mt-12">
        <van-cell title="2、获取签章应用链接" />
        <div class="sign">
          <van-button type="info" block @click="createSignFlow()">
            我要签章
          </van-button>
        </div>
      </van-cell-group>
      <van-cell-group class="mt-12">
        <van-cell title="3、获取签章在线链接" />
        <div class="sign">
          <van-button type="info" block @click="downSignPDF(signFlowId)">
            获取文档地址
          </van-button>
        </div>
        <template v-if="downUrl.length">
          <van-cell
            v-for="(item, index) in pdfForms"
            :key="index"
            :title="item.path + '.pdf'"
            :title-style="{ color: '#1989fa' }"
            @click="copyLink(downUrl[index])"
          />
        </template>
      </van-cell-group>
      <van-cell-group class="mt-12">
        <van-cell title="4、完善申报材料" />
        <div class="sign">
          <van-button type="info" block @click="toPath()"> 下一步 </van-button>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    padding: 8px;
    margin: 12px 0;
    min-height: calc(100vh - 260px);
    .doc {
      height: 56vh;
      overflow-y: scroll;
      overflow-x: hidden;
      .pdf-view {
        margin: 0 auto;
      }
    }
    .doc-open {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99;
      background-color: #00000054;
      text-align: center;
    }
    .sign {
      margin: 8px 0;
      padding: 0 12px;
    }
  }
}
</style>
