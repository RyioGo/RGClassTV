<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component
export default class RGPicker extends Vue {
  //  描述
  @Prop({ type: String, default: "请选择" }) placeholder!: string;
  //  名称
  @Prop({ type: String, default: "" }) label!: string;
  //  规则
  @Prop({ type: Array, default: () => [] }) rules!: [];
  //  双向绑定
  @PropSync("value", { type: String, required: true })
  data!: string;

  public minDate = new Date(1980, 0, 31);

  public showPicker = false;

  public onConfirm(date: any): void {
    this.data = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日`;

    this.showPicker = false;
  }
}
</script>

<template>
  <div class="rg-picker">
    <van-field
      readonly
      clickable
      :label="label"
      v-model="data"
      :placeholder="placeholder + label"
      @click="showPicker = true"
      :required="rules.length > 0"
      :rules="rules"
    />
    <van-calendar
      v-model="showPicker"
      :show-confirm="false"
      @confirm="onConfirm"
      :min-date="minDate"
    />
  </div>
</template>

<style scoped lang="less"></style>
