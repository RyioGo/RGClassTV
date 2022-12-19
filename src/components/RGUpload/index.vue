<script lang="ts">
interface afterReadType {
  content: string;
  message: string;
  status: string;
  file: File;
}

import { Component, PropSync, Vue } from "vue-property-decorator";
import gftApi from "@/api/main";
@Component
export default class RGUpload extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @PropSync("value", { type: Array, required: true }) files!: any;

  public async afterRead({
    content,
    file,
    message,
    status,
  }: afterReadType): Promise<void> {
    let interface_id: string = this.storage.get("globalConfig").api[3];

    const res = await gftApi.getFile(interface_id, file);
    debugger;
  }
}
</script>

<template>
  <div class="rg-upload">
    <van-uploader :value="files" :after-read="afterRead" :max-count="6" />
  </div>
</template>

<style scoped lang="less">
.rg-upload {
}
</style>
