<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import utils from "@/libs/utils";
@Component
export default class RGEval extends Vue {
  toEval(): void {
    let evalData = this.storage.get("globalConfig").eval;
    let name = this.storage.get("evalCode");
    let code = this.pinyin(name)[0]?.join("") || "";
    evalData.appCode = evalData.appCode + code;
    evalData.appName = evalData.appName + name;
    utils.toEval(evalData);
  }
}
</script>

<template>
  <div class="rg-eval" @click="toEval()">
    <van-icon name="chat-o" size="24" color="#fff" />
  </div>
</template>

<style scoped lang="less">
.rg-eval {
  position: fixed;
  top: 80vh;
  right: 0;
  z-index: 5;
  background-color: #1989fa;
  padding: 6px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>
