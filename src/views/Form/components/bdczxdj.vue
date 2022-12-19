<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RGPicker from "@/components/RGPicker/index.vue";
import formDict from "./dict";
@Component({
  components: {
    RGPicker,
  },
})
export default class bdczxdjCom extends Vue {
  public title = "不动产注销登记受理申请书";
  public form: any = {
    DengJiLeiXing: "",
    XGZH: "",
    RYLX: "",
    MC: "",
    ZJLX: "",
    ZJHM: "",
    DH: "",
  };
  public dict: any = formDict.bdczxdj;
}
</script>

<template>
  <div class="form">
    <van-cell-group inset>
      <van-cell :title="title" />
    </van-cell-group>
    <van-form>
      <van-cell-group inset style="margin-top: 12px">
        <RGPicker
          :value.sync="form.DengJiLeiXing"
          :localData="dict.DengJiLeiXing"
          placeholder="登记类型"
        />
        <van-field v-model="form.XGZH" placeholder="相关证号" />
        <RGPicker
          :value.sync="form.RYLX"
          :localData="dict.RYLX"
          placeholder="人员类型"
        />
        <van-field v-model="form.MC" placeholder="名称" />
        <RGPicker
          :value.sync="form.ZJLX"
          :localData="dict.ZJLX"
          placeholder="证件类型"
        />
        <van-field v-model="form.ZJHM" placeholder="证件号码" />
        <van-field v-model="form.DH" placeholder="电话" />
      </van-cell-group>
    </van-form>
  </div>
</template>

<style scoped lang="less">
.form {
  padding: 8px 0;
  .title {
    text-align: center;
    margin-bottom: 8px;
  }
}
</style>
