<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import SignaturePad from "signature_pad";
@Component
export default class RGSign extends Vue {
  @Ref("signRef") signRef!: HTMLCanvasElement;

  public signCan: SignaturePad | null = null;

  public ok(): void {
    const pass = this.signCan?.isEmpty();
    if (pass) {
      console.log();
    }
  }

  public clear(): void {
    this.signCan?.clear();
  }

  private mounted() {
    this.signRef.width = document.body.clientWidth;
    this.signRef.height = document.body.clientHeight;
    this.signCan = new SignaturePad(this.signRef);
  }
}
</script>

<template>
  <div class="rg-sign">
    <canvas id="signature" ref="signRef"></canvas>
    <van-cell-group class="groups" :border="false">
      <van-cell>
        <van-button block icon="success" type="info" @click="ok()">
          完成
        </van-button>
      </van-cell>
      <van-cell>
        <van-button block icon="replay" type="warning" @click="clear()">
          重置
        </van-button>
      </van-cell>
      <van-cell>
        <van-button block icon="revoke" type="default"> 取消 </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">
.rg-sign {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  #signature {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }
  .groups {
    transform: rotate(90deg);
    position: absolute;
    bottom: -44px;
    right: 42px;
    z-index: 2;
  }
}
</style>
