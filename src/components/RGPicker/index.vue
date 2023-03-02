<script lang="ts">
interface dictType {
  text: string;
  value: string | number;
}

import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component
export default class RGPicker extends Vue {
  //  字典
  @Prop({ type: Array, required: true }) localData!: Array<dictType>;
  //  描述
  @Prop({ type: String, default: "请输入" }) placeholder!: string;
  //  名称
  @Prop({ type: String, default: "" }) label!: string;
  //  规则
  @Prop({ type: Array, default: () => [] }) rules!: [];
  //  双向绑定
  @PropSync("value", { required: true })
  data!: any;

  public showPicker = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public key: any = null;

  public onConfirm(val: dictType): void {
    this.key = val.text;
    this.data = val.value;
    this.showPicker = false;
  }

  public get labelData(): string {
    if (this.key && this.key.length) {
      return this.key;
    }
    let str = "";
    this.localData.forEach((item: dictType) => {
      if (item.value == this.data) {
        str = item.text;
      }
    });
    return str;
  }
}
</script>

<template>
  <div class="rg-picker">
    <van-field
      readonly
      clickable
      :label="label"
      v-model="labelData"
      :placeholder="placeholder"
      @click="showPicker = true"
      :required="rules.length > 0"
      :rules="rules"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="localData"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<style scoped lang="less"></style>
