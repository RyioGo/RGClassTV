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
export default class bdcdydjCom extends Vue {
  public title = "不动产抵押登记受理申请书";
  public form: any = {
    DengJiDaLei: "",
    DengJiXiaoLei: "",
    DengJiYuanYin: "",
    BDChJZ: "",
    DYQiXian: "",
    QiShiRiQi: "",
    ZhongZhiRiQi: "",
    BDBZhuZhaiQuanSE: "",
    ZJJZWDiYaFanWei: "",
    ShiFuCunZaiJinZhi: "",
    DiYaShunWei: "",
    YueDingNaRong: "",
    DiYaDanBaoFanWei: "",
    ZuiGaoZhaiQuanQueDingShiShi: "",
    ShenQingBeiZhu: "",
    QiTaQuanLiZK: "",
    FuJi: "",
  };
  public dict: any = formDict.bdcdydj;
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
          :value.sync="form.DengJiDaLei"
          :localData="dict.DengJiDaLei"
          placeholder="登记大类"
        />
        <RGPicker
          :value.sync="form.DengJiXiaoLei"
          :localData="dict.DengJiXiaoLei"
          placeholder="登记小类"
        />
        <RGPicker
          :value.sync="form.DengJiYuanYin"
          :localData="dict.DengJiYuanYin"
          placeholder="登记原因"
        />
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <van-field v-model="form.BDChJZ" placeholder="不动产价值" />
        <van-field v-model="form.DYQiXian" placeholder="抵押期限" />
        <van-field v-model="form.QiShiRiQi" placeholder="起始日期" />
        <van-field v-model="form.ZhongZhiRiQi" placeholder="终止日期" />
        <van-field
          v-model="form.BDBZhuZhaiQuanSE"
          placeholder="被担保主债权数额"
        />
        <van-field
          v-model="form.ZJJZWDiYaFanWei"
          placeholder="在建建筑物抵押范围"
        />
        <van-field
          v-model="form.ShiFuCunZaiJinZhi"
          placeholder="是否存在禁止或限制转让抵押不动产的约定"
        />
        <van-field v-model="form.DiYaShunWei" placeholder="抵押顺位" />
        <van-field v-model="form.YueDingNaRong" placeholder="约定内容" />
        <van-field v-model="form.DiYaDanBaoFanWei" placeholder="抵押担保范围" />
        <van-field
          v-model="form.ZuiGaoZhaiQuanQueDingShiShi"
          placeholder="最高债券确定事实"
        />
        <van-field v-model="form.ShenQingBeiZhu" placeholder="申请备注" />
        <van-field v-model="form.QiTaQuanLiZK" placeholder="其他权利状况" />
        <van-field v-model="form.FuJi" placeholder="附计" />
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
