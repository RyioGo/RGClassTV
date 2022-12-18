<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class defaultCom extends Vue {
  public title = "默认表单";
  public form: any = {
    TongYongQiYe: "",
    TongYongXiangMu: "",
  };
}
</script>

<template>
  <div class="form">
    <van-cell-group inset>
      <van-cell :title="title" />
      <van-form>
        <van-field v-model="form.TongYongQiYe" placeholder="项目" />
        <van-field
          v-model="form.TongYongXiangMu"
          placeholder="备注"
          rows="1"
          autosize
          type="textarea"
        />
      </van-form>
    </van-cell-group>
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
