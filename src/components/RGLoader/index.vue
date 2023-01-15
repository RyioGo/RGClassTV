<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RGLoader extends Vue {
  //  显示
  @Prop({ type: Boolean, required: true }) show!: boolean;
  //  描述
  @Prop({ type: String, default: "加载中" }) desc!: string;
}
</script>

<template>
  <div class="rg-loading" v-if="show" @touchmove.prevent>
    <div class="rg-loading_container" @touchmove.prevent>
      <div class="rg-loading_loader"></div>
      <div class="rg-loading_text">{{ desc }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.rg-loading {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  background-color: @color-black;
  width: 100vw;
  height: 100vh;
  .rg-loading_container {
    max-width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .rg-loading_loader {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      position: relative;
      &::before,
      &::after {
        content: "";
        display: block;
        width: 50px;
        position: absolute;
        left: 0;
      }
      &::before {
        border-radius: 50%;
        background: @color-white;
        height: 8px;
        opacity: 0.1;
        top: 59px;
        animation: shadow 0.5s linear infinite;
      }
      &::after {
        border-radius: 3px;
        background: @color-primary;
        height: 50px;
        top: 0;
        animation: loading 0.5s linear infinite;
      }
    }
    .rg-loading_text {
      margin-top: 20px;
      color: @color-white;
      font-size: 14px;
      font-weight: 300;
    }
  }
}

@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
@keyframes loading {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}
</style>
