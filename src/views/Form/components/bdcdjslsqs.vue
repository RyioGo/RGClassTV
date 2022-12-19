<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
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

  public addForm(key: number): void {
    this.form.RYXXList.splice(
      key + 1,
      0,
      JSON.parse(JSON.stringify(this.addData))
    );
  }
  public delForm(key: number): void {
    this.form.RYXXList.splice(key, 1);
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
      <van-cell-group
        inset
        style="margin-top: 12px"
        v-for="(item, index) in form.RYXXList"
        :key="index"
      >
        <RGPicker
          :value.sync="item.RYLX"
          :localData="dict.RYLX"
          placeholder="人员类型"
        />
        <van-field v-model="item.MC" placeholder="人员名称" />
        <van-field v-model="item.DH" placeholder="联系电话" />
        <RGPicker
          :value.sync="item.ZJLX"
          :localData="dict.ZJLX"
          placeholder="证件类型"
        />
        <van-field v-model="item.ZJHM" placeholder="证件编号" />
        <RGPicker
          :value.sync="item.QLRXZ"
          :localData="dict.QLRXZ"
          placeholder="权利人性质"
        />
        <div class="btns">
          <van-button type="info" block @click="addForm(index)">
            添加本组
          </van-button>
          <div style="width: 12px" v-if="form.RYXXList.length > 1 && index" />
          <van-button
            type="danger"
            block
            v-if="form.RYXXList.length > 1 && index"
            @click="delForm(index)"
          >
            删除本组
          </van-button>
        </div>
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <van-field v-model="form.ShuiBuMen" placeholder="水部门" />
        <van-field v-model="form.ShuiBuMen" placeholder="水号" />
        <van-field v-model="form.DianBuMen" placeholder="电部门" />
        <van-field v-model="form.DianKeHuBianHao" placeholder="电号" />
        <van-field v-model="form.RanQiBuMen" placeholder="燃气部门" />
        <van-field v-model="form.RanQiKeHuBianHao" placeholder="燃气号" />
        <van-field v-model="form.DianShi" placeholder="电视" />
        <van-field v-model="form.WangLuo" placeholder="网络" />
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <van-field v-model="form.ZuoLuo" placeholder="坐落" />
        <van-field
          v-model="form.BuDongChanDanYuanHao"
          placeholder="不动产单元号"
        />
        <RGPicker
          :value.sync="form.FangWuLeiXing"
          :localData="dict.FangWuLeiXing"
          placeholder="不动产类型"
        />
        <van-field v-model="form.TaoNaJianZhuMianJi" placeholder="面积" />
        <van-field v-model="form.XGZH" placeholder="原不动产权证书号" />
        <van-field v-model="form.GuiHuaYongTu" placeholder="用途" />
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <RGPicker
          :value.sync="form.HeTongDaYinLeiXing"
          :localData="dict.HeTongDaYinLeiXing"
          placeholder="合同打印类型"
        />
        <van-field
          v-model="form.HeTongDaYinFenShu"
          placeholder="合同打印份数"
        />
        <van-field v-model="form.GeZhiFenShu" placeholder="各执份数" />
        <van-field v-model="form.HeTongBianHao" placeholder="合同编号" />
        <van-field
          v-model="form.HeTongQianDingRiQi"
          placeholder="合同签订日期"
        />
        <RGPicker
          :value.sync="form.FangWuYongTu"
          :localData="dict.FangWuYongTu"
          placeholder="房屋用途"
        />
        <van-field v-model="form.JianZhuMianJi" placeholder="建筑面积(㎡)" />
        <van-field
          v-model="form.GongYouQuanZhengHao"
          placeholder="共有权证号"
        />
        <van-field v-model="form.JunGongShiJian" placeholder="竣工时间" />
        <van-field
          v-model="form.HeTongZongJiaWanYuan"
          placeholder="合同总价(万元)"
        />
        <van-field v-model="form.DanJiaWanYuan" placeholder="单价(万元)" />
        <RGPicker
          :value.sync="form.FangKuanJiaoFuFangShi"
          :localData="dict.FangKuanJiaoFuFangShi"
          placeholder="房款交付方式"
        />
        <van-field
          v-model="form.JiaFangJiaoFangRiQi"
          placeholder="甲方交房日期"
        />
        <van-field v-model="form.ZiXingBanLiRiQi" placeholder="自行办理日期" />
        <RGPicker
          :value.sync="form.ShuangFangZhengYiJieJueFangShi"
          :localData="dict.ShuangFangZhengYiJieJueFangShi"
          placeholder="双方争议解决方式"
        />
        <van-field v-model="form.BuChongTiaoKuan" placeholder="补充条款" />
        <van-field v-model="form.ZongDiMianJi" placeholder="宗地面积" />
        <van-field
          v-model="form.TuDiShiYongQuanRen"
          placeholder="土地使用权人"
        />
        <RGPicker
          :value.sync="form.TuDiQuanLiLeiXing"
          :localData="dict.TuDiQuanLiLeiXing"
          placeholder="土地权利类型"
        />
        <van-field
          v-model="form.TuDiShiYongQuanMianJi"
          placeholder="土地使用权面积"
        />
        <RGPicker
          :value.sync="form.TuDiQuanLiXingZhi"
          :localData="dict.TuDiQuanLiXingZhi"
          placeholder="土地权利性质"
        />
        <RGPicker
          :value.sync="form.TuDiYongTu"
          :localData="dict.TuDiYongTu"
          placeholder="土地用途"
        />
        <van-field v-model="form.FenTanTuDiMianJi" placeholder="分摊土地面积" />
        <van-field v-model="form.DuYongTuDiMianJi" placeholder="独用土地面积" />
        <van-field v-model="form.QiShiShiJian" placeholder="起始时间" />
        <van-field v-model="form.ZhongZhiShiJian" placeholder="终止时间" />
        <van-field v-model="form.ShiYongQiXian" placeholder="使用期限" />
        <van-field
          v-model="form.JianZhuWuZhanDiMianJi"
          placeholder="建筑物占地面积"
        />
        <RGPicker
          :value.sync="form.FangWuJieGou"
          :localData="dict.FangWuJieGou"
          placeholder="房屋结构"
        />
        <RGPicker
          :value.sync="form.QuanLiLeiXing"
          :localData="dict.QuanLiLeiXing"
          placeholder="权利类型"
        />
        <RGPicker
          :value.sync="form.QuanLiXingZhi"
          :localData="dict.QuanLiXingZhi"
          placeholder="权利性质"
        />
        <van-field
          v-model="form.TaoNaJianZhuMianJi"
          placeholder="套内建筑面积"
        />
        <van-field v-model="form.GuiHuaYongTu" placeholder="规划用途" />
        <van-field
          v-model="form.FenTanJianZhuMianJi"
          placeholder="分摊建筑面积"
        />
        <RGPicker
          :value.sync="form.QuDeFangShi"
          :localData="dict.QuDeFangShi"
          placeholder="取得方式"
        />
        <van-field v-model="form.PingGuJinE" placeholder="评估金额" />
        <RGPicker
          :value.sync="form.FangWuLeiXing"
          :localData="dict.FangWuLeiXing"
          placeholder="房屋类型"
        />
        <RGPicker
          :value.sync="form.JiaoYiLeiXing"
          :localData="dict.JiaoYiLeiXing"
          placeholder="交易类型"
        />
        <van-field v-model="form.JiaoYiJiaGe" placeholder="交易价格" />
        <van-field v-model="form.HeTongJinE" placeholder="合同金额" />
        <van-field
          v-model="form.QuanLiQiTaZhuangKuang"
          placeholder="权利其他状况"
        />
        <van-field v-model="form.FuJi" placeholder="附记" />
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
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  }
}
</style>
