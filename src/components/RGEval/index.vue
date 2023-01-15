<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import utils from "@/libs/utils";
@Component
export default class RGEval extends Vue {
  public isOpen = false;

  public toEval() {
    let evalData = this.storage.get("globalConfig").eval;
    let name = this.storage.get("evalCode");
    let code = this.pinyin(name)[0]?.join("") || "";
    evalData.appCode = evalData.appCode + code;
    evalData.appName = evalData.appName + name;
    utils.toEval(evalData);
  }

  public open() {
    this.isOpen = !this.isOpen;
  }

  public toWorker() {
    this.$router.push({
      name: "worker",
    });
  }
}
</script>

<template>
  <section class="rg-model">
    <div :class="['float-btn-group', isOpen ? 'open' : '']">
      <van-button
        class="btn-float btn-triger"
        type="info"
        size="small"
        round
        icon="apps-o"
        @click="open()"
      />
      <div class="btn-list">
        <van-button
          class="btn-float"
          type="info"
          size="small"
          round
          icon="chat-o"
          @click="toEval()"
        />
        <van-button
          class="btn-float"
          type="info"
          size="small"
          round
          icon="newspaper-o"
          @click="toWorker()"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
.rg-model {
  position: fixed;
  top: 80vh;
  right: 0;
  z-index: 5;
}
.btn-float {
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border: none;
  font-size: 18px;
  color: #fff;
  text-align: center;
  position: relative;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.11);
}

.btn-float + .btn-float {
  margin-left: 5px;
}

.float-btn-group {
  position: relative;
  float: right;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.float-btn-group .btn-triger {
  z-index: 15;
  float: left;
}
.float-btn-group .btn-list {
  position: absolute;
  right: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.rg-model .float-btn-group {
  float: left;
}
.rg-model .float-btn-group .btn-list .btn-float {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  -ms-transform: scale(0, 0);
  -webkit-transform: scale(0, 0);
  transform: scale(0, 0);
}
.rg-model .float-btn-group .btn-list .btn-float:nth-child(1) {
  -moz-transition: 0.2s 0.7s;
  -o-transition: 0.2s 0.7s;
  -webkit-transition: 0.2s;
  -webkit-transition-delay: 0.7s;
  -webkit-transition: 0.2s 0.7s;
  transition: 0.2s 0.7s;
}
.rg-model .float-btn-group .btn-list .btn-float:nth-child(2) {
  -moz-transition: 0.2s 0.92s;
  -o-transition: 0.2s 0.92s;
  -webkit-transition: 0.2s;
  -webkit-transition-delay: 0.92s;
  -webkit-transition: 0.2s 0.92s;
  transition: 0.2s 0.92s;
}
.rg-model .float-btn-group.open .btn-list .btn-float {
  opacity: 1;
  -ms-transform: scale(0.9, 0.9);
  -webkit-transform: scale(0.9, 0.9);
  transform: scale(0.9, 0.9);
}
.rg-model .float-btn-group.open .btn-list .btn-float:nth-child(1) {
  top: -110px;
  -moz-transition: 0.2s 0.5s;
  -o-transition: 0.2s 0.5s;
  -webkit-transition: 0.2s;
  -webkit-transition-delay: 0.5s;
  -webkit-transition: 0.2s 0.5s;
  transition: 0.2s 0.5s;
}
.rg-model .float-btn-group.open .btn-list .btn-float:nth-child(2) {
  top: -55px;
  -moz-transition: 0.2s 0.3s;
  -o-transition: 0.2s 0.3s;
  -webkit-transition: 0.2s;
  -webkit-transition-delay: 0.3s;
  -webkit-transition: 0.2s 0.3s;
  transition: 0.2s 0.3s;
}
</style>
