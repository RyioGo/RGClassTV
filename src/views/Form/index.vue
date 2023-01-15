<!-- eslint-disable @typescript-eslint/no-var-requires -->

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormView extends Vue {
  com = null;

  private created() {
    let formId = this.storage.get("selectData").formId;

    this.com = require(`./components/${formId}.vue`).default;
  }
}
</script>

<template>
  <div class="rg-body">
    <div class="main">
      <component :is="com"></component>
    </div>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    min-height: calc(100vh - 56px);
    overflow: scroll;
  }
}
</style>
