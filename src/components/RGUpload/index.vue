<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
interface afterReadType {
  content: string;
  message: string;
  status: string;
  file: File;
  data?: any;
}

import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import gftApi from "@/api/main";

import utils from "@/libs/utils";
@Component
export default class RGUpload extends Vue {
  @PropSync("value", { type: Array, required: true }) files!: any;
  // 额外参数
  @Prop({ type: Object }) params!: any;

  public afterRead(fileObj: afterReadType): void {
    let interface_id: string = this.storage.get("globalConfig").apis.sczmcl;
    fileObj.status = "uploading";
    fileObj.message = "上传中...";

    utils.dealImage(fileObj.content, async (file: any) => {
      try {
        const res = await gftApi.getFile(interface_id, file);
        if (res && res.code == 200) {
          res.data = JSON.parse(res.data);
          fileObj.status = "done";
          fileObj.message = "上传完成";
          fileObj.data = { ...this.params, filePath: res.data.data.docid };
        } else {
          fileObj.status = "failed";
          fileObj.message = "上传失败";
        }
      } catch (error) {
        fileObj.status = "failed";
        fileObj.message = "上传失败";
      }
    });
  }
}
</script>

<template>
  <div class="rg-upload">
    <van-uploader v-model="files" :after-read="afterRead" :max-count="6" />
  </div>
</template>

<style scoped lang="less">
.rg-upload {
}
</style>
