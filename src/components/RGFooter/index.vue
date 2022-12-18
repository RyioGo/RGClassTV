<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RGFooter extends Vue {
  get provider(): string {
    return this.storage.get("globalConfig").provider || "";
  }
}
</script>

<template>
  <div class="rg-footer">
    <img src="@/static/img/gft.png" class="logo" alt="赣服通" />
    <p class="provider">{{ provider }}</p>
  </div>
</template>

<style scoped lang="less">
.rg-footer {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 24px;
    height: 24px;
  }
  .provider {
    margin-top: 5px;
    font-size: @font-size-small;
    color: @color-text-regular;
  }
}
</style>
