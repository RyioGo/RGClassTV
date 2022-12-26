<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RGHeader extends Vue {
  @Prop({ type: String, default: process.env.VUE_APP_NAME }) title!: string;
  @Prop({
    type: String,
    default: "",
  })
  subTitle!: string;

  get cover(): string {
    return this.storage.get("globalConfig").cover;
  }
}
</script>

<template>
  <div class="rg-header">
    <img class="cover" :src="cover" alt="封面图" />
    <p class="title">{{ title }}</p>
    <p class="sub-title ov-2">{{ subTitle }}</p>
  </div>
</template>

<style scoped lang="less">
.rg-header {
  height: 180px;
  width: 100%;
  position: relative;
  color: @color-white;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000023;
  }
  .cover {
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    z-index: 3;
  }
  .title {
    top: 30%;
    left: 20px;
    // left: 50%;
    // transform: translateX(-50%);
    font-size: 26px;
  }
  .sub-title {
    width: calc(100% - 40px);
    left: 20px;
    top: 60%;
    font-size: @font-size-medium;
  }
}
</style>
