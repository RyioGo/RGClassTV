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
  //  创建成功的用户id
  public accountId = "";
  //  签署文档返回到key值
  public fileKey = "";
  //  签章流程id
  public signFlowId = "";
  //  pdf数据集合
  public pdfDoc = {
    doc: null,
    pages: 0,
  };
  //  签章后文档地址
  downUrl = "";

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
        //  调用生成pdf文件
        this.wordToPdf();
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
  private async wordToPdf() {
    let interface_id: string = this.storage.get("globalConfig").apis.wordToPdf;
    this.$store.commit("loader/setOption", "生成PDF文件...");
    const res = await gftApi.getGate(
      interface_id,
      {
        filePath: "/data/" + this.storage.get("filePath"),
        map: this.storage.get("form"),
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
        let file: File = utils.base64ToFile(base64, "不动产登记受理申请书.pdf");

        //  转换后将file文件自动上传签章流程
        this.upSignPDF(file);
        //  渲染未签章的文档在页面
        this._loadFile(base64);
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
  private async upSignPDF(file: File) {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzwjzc;
    this.$store.commit("loader/setOption", "上传待签章文件...");
    const res = await gftApi.getFile(interface_id, file);
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.fileKey = res.data.data.substring(
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
      subject: "不动产登记受理申请书",
      signDocs: [
        {
          docFilekey: this.fileKey,
          docName: "不动产登记受理申请书",
        },
      ],
      signers: [
        {
          accountId: this.accountId,
          accountType: 2,
          signDocDetails: [
            {
              docFilekey: this.fileKey,
              signPos: [
                {
                  key: "权利人",
                  signType: 0,
                },
              ],
            },
          ],
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
        this.$dialog.alert({
          title: "已创建签章流程",
          message: `提示：签章过程中请勿退出此页面，\n稍后将会发送短信至${UserModule.forPhone}。`,
          theme: "round-button",
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
  public async downSignPDF(signFlowId: string) {
    let interface_id: string = this.storage.get("globalConfig").apis.dzqzqswd;
    this.$store.commit("loader/setOption", "获取下载链接...");
    const res = await gftApi.getGate(interface_id, {
      signFlowId,
    });
    this.$store.commit("loader/setOption", false);
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.downUrl = res.data.data.substring(
          res.data.data.indexOf("downloadDocUrl") + 15,
          res.data.data.indexOf("finishFileKey") - 2
        );
        //  签章成功后弹窗提示
        this.$dialog
          .confirm({
            title: "成功！",
            message: "请将地址复制至浏览器即可保存文档。",
            confirmButtonText: "复制",
            confirmButtonColor: "#4fc08d",
          })
          .then(() => {
            this.$copyText(this.downUrl).then(
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

  //  加载pdf文件
  _loadFile(url: string) {
    this.pdfjs.getDocument(url).promise.then((pdf: any) => {
      this.pdfDoc.doc = pdf;
      this.pdfDoc.pages = pdf.numPages;
      this.$nextTick(() => {
        this._renderPage(1);
      });
    });
  }
  //  渲染pdf至canvas画板
  _renderPage(num: number) {
    (this.pdfDoc.doc as any).getPage(num).then((page: any) => {
      let canvas = document.getElementById(
        "pdf-view" + num
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
        this._renderPage(num + 1);
      }
    });
  }
  private created() {
    this.createUserPer();
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader :subTitle="subTitle" />
    <div class="main">
      <van-cell-group inset>
        <van-cell title="1、待签章文档预览" />
        <div class="doc" v-if="pdfDoc.pages">
          <canvas
            class="pdf-view"
            v-for="page in pdfDoc.pages"
            :id="'pdf-view' + page"
            :key="page"
          />
        </div>
        <van-empty description="加载文档..." v-else />
      </van-cell-group>
      <van-cell-group inset class="mt-12">
        <van-cell title="2、获取签章应用链接" />
        <div class="sign">
          <van-button type="info" block @click="createSignFlow()">
            我要签章
          </van-button>
        </div>
      </van-cell-group>
      <van-cell-group inset class="mt-12">
        <van-cell title="3、签章文档地址" />
        <div class="sign">
          <van-button type="info" block @click="downSignPDF(signFlowId)">
            获取文档地址
          </van-button>
        </div>
      </van-cell-group>
      <van-cell-group inset class="mt-12">
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
    margin: 12px 0;
    min-height: calc(100vh - 260px);
    .doc {
      height: 48vh;
      overflow-y: scroll;
      .pdf-view {
        margin: 0 auto;
      }
    }
    .sign {
      margin: 8px 0;
      padding: 0 12px;
    }
  }
}
</style>
