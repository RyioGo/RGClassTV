<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

@Component
export default class FormView extends Vue {
  com: any = null;

  @Ref("form") from!: any;

  public toPath(): void {
    this.storage.set("form", this.from.form);
    this.$router.push({
      name: "submit",
    });
  }

  private created() {
    let formId = this.storage.get("selectData").formId;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.com = require(`./components/${formId}.vue`).default;
  }
}
</script>

<template>
  <div class="rg-body">
    <div class="main">
      <component :is="com" ref="form"></component>
    </div>
    <van-cell-group :border="false" class="group">
      <van-button type="info" block @click="toPath()">下一步</van-button>
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    padding: 12px 0;
    min-height: calc(100vh - 124px);
    overflow: scroll;
  }
  .group {
    background-color: transparent;
    padding: 12px;
  }
}
</style>
