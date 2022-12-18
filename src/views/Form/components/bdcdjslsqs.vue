<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import formDict from "./dict";
@Component
export default class bdcdjslsqsCom extends Vue {
  public title = "不动产登记受理申请书";
  public form: any = {
    BuChongTiaoKuan: "",
    BuDongChanDanYuanHao: "",
    DanJiaWanYuan: "",
    DengJiDaLei: "",
    DengJiXiaoLei: "",
    DengJiYuanYin: "",
    DianBuMen: "",
    DianKeHuBianHao: "",
    DianShi: "",
    DuYongTuDiMianJi: "",
    FangKuanJiaoFuFangShi: "",
    FangWuJieGou: "",
    FangWuLeiXing: "",
    FangWuQuanZhengHao: "",
    FangWuYongTu: "",
    FenTanJianZhuMianJi: "",
    FenTanTuDiMianJi: "",
    FuJi: "",
    GeZhiFenShu: "",
    GongYouQuanZhengHao: "",
    GuiHuaYongTu: "",
    HeTongBianHao: "",
    HeTongDaYinFenShu: "",
    HeTongDaYinLeiXing: "",
    HeTongJinE: "",
    HeTongQianDingRiQi: "",
    HeTongZongJiaWanYuan: "",
    JiaFangJiaoFangRiQi: "",
    JianZhuMianJi: "",
    JianZhuWuZhanDiMianJi: "",
    JiaoYiJiaGe: "",
    JiaoYiLeiXing: "",
    JunGongShiJian: "",
    PingGuJinE: "",
    QiShiShiJian: "",
    QuDeFangShi: "",
    QuanLiLeiXing: "",
    QuanLiQiTaZhuangKuang: "",
    QuanLiXingZhi: "",
    RYXXList: [
      {
        RYLX: "",
        MC: "",
        ZJLX: "",
        ZJHM: "",
        DH: "",
        QLRXZ: "",
      },
    ],
    RanQiBuMen: "",
    RanQiKeHuBianHao: "",
    ShiYongQiXian: "",
    ShuangFangZhengYiJieJueFangShi: "",
    ShuiBuMen: "",
    ShuiKeHuBianHao: "",
    TaoNaJianZhuMianJi: "",
    TuDiQuanLiLeiXing: "",
    TuDiQuanLiXingZhi: "",
    TuDiShiYongQuanMianJi: "",
    TuDiShiYongQuanRen: "",
    TuDiYongTu: "",
    WangLuo: "",
    XGZH: "",
    ZhongZhiShiJian: "",
    ZiXingBanLiRiQi: "",
    ZongDiMianJi: "",
    ZuoLuo: "",
  };
  public addData: any = {
    RYLX: "",
    MC: "",
    ZJLX: "",
    ZJHM: "",
    DH: "",
    QLRXZ: "",
  };
  public dict: any = formDict.bdcdjslsqs;
  public showPicker = false;
  public columns: any = [];
  public selectKey = "";

  public onConfirm(data: any): void {
    this.form[this.selectKey] = data.value;
    this.showPicker = false;
  }
  public openPicker(key: string): void {
    this.columns = this.dict[key];
    this.selectKey = key;
    this.showPicker = true;
  }
}
</script>

<template>
  <div class="form">
    <van-form>
      <van-cell-group inset>
        <van-cell :title="title" />
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <van-field
          readonly
          clickable
          v-model="form.DengJiDaLei"
          placeholder="登记大类"
          @click="openPicker('DengJiDaLei')"
        />
        <van-field
          readonly
          clickable
          v-model="form.DengJiXiaoLei"
          placeholder="登记小类"
          @click="openPicker('DengJiXiaoLei')"
        />
        <van-field
          readonly
          clickable
          v-model="form.DengJiYuanYin"
          placeholder="登记原因"
          @click="openPicker('DengJiYuanYin')"
        />
      </van-cell-group>
      <van-cell-group
        inset
        style="margin-top: 12px"
        v-for="(item, index) in form.RYXXList"
        :key="index"
      >
        <van-field
          readonly
          clickable
          v-model="item.RYLX"
          placeholder="人员类型"
          @click="openPicker('RYLX')"
        />
        <van-field
          readonly
          clickable
          v-model="form.DengJiXiaoLei"
          placeholder="登记小类"
          @click="openPicker('DengJiXiaoLei')"
        />
        <van-field
          readonly
          clickable
          v-model="form.DengJiYuanYin"
          placeholder="登记原因"
          @click="openPicker('DengJiYuanYin')"
        />
      </van-cell-group>
    </van-form>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
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
