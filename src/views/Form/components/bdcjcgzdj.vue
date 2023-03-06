<!-- 二手房转移登记及水电气联动过户 -->
<script lang="ts">
//  for node_modules api
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
//  for you api
import gftApi from "@/api/main";
//  for you ts
import dict from "../dict";
import utils from "@/libs/utils";

//  for you components
import RGPicker from "@/components/RGPicker/index.vue";
import RGDataPicker from "@/components/RGDataPicker/index.vue";
@Component({
  components: { RGPicker, RGDataPicker },
})
export default class bdcjcgzdjCom extends Vue {
  //  表单步骤
  active = 0;
  //  相关字典
  dict = dict;
  //  工具包
  utils = utils;
  //  业务表单
  form: any = {
    base: {
      located: "",
      certificateCode: "",
      unitNum: "",
      estateType: "房屋",
      area: "",
      use: "",
      claimAccount: "",
      performanceTerm: "",
      buildingsRange: "",
      soil_located: "",
      soil_unitNum: "",
      remarks: "",
    },
    //权利人
    ri: {
      rightName: "",
      ri_identityType: "身份证",
      ri_IdNum: "",
      ri_address: "",
      ri_zipCode: "",
      ri_principalName: "",
      ri_principalTel: "",
      ri_agentName: "",
      ri_agentTel: "",
      ri_agency: "",
      waterNum: "",
      elNum: "",
      gasNum: "",
      tvNum: "",
      QLRXZ: "",
    },
    //义务人
    ob: {
      obligeeName: "",
      ob_identityType: "身份证",
      ob_IdNum: "",
      ob_address: "",
      ob_zipCode: "",
      ob_principalName: "",
      ob_principalTel: "",
      ob_agentName: "",
      ob_agentTel: "",
      ob_agency: "",
      QLRXZ: "",
    },
    //  浪潮
    dataInfo: {
      DengJiDaLei: "转移登记",
      DengJiXiaoLei: "转移登记",
      DengJiYuanYin: "继承",
      HeTongBianHao: "",
      HeTongDaYinLeiXing: "",
      HeTongZongJiaWanYuan: "",
      HeTongQianDingRiQi: "",
      HeTongDaYinFenShu: "",
      HeTongJinE: "",
      GeZhiFenShu: "",
      BuChongTiaoKuan: "",
      JiaoYiLeiXing: "",
      JiaoYiJiaGe: "",
      DanJiaWanYuan: "",
      ZuoLuo: "",
      FangWuJieGou: "",
      GuiHuaYongTu: "",
      FangWuYongTu: "",
      JianZhuMianJi: "",
      TaoNaJianZhuMianJi: "",
      FenTanJianZhuMianJi: "",
      ZongDiMianJi: "",
      XGZH: "",
      BuDongChanDanYuanHao: "",
      GongYouQuanZhengHao: "",
      FangWuQuanZhengHao: "",
      QuDeFangShi: "",
      FangKuanJiaoFuFangShi: "",
      ShuiBuMen: "",
      ShuiKeHuBianHao: "",
      DianBuMen: "",
      DianKeHuBianHao: "",
      RanQiBuMen: "",
      RanQiKeHuBianHao: "",
      DianShi: "",
      WangLuo: "",
      JunGongShiJian: "",
      JiaFangJiaoFangRiQi: "",
      ZiXingBanLiRiQi: "",
      ShuangFangZhengYiJieJueFangShi: "",
      TuDiShiYongQuanRen: "",
      JianZhuWuZhanDiMianJi: "",
      TuDiQuanLiLeiXing: "",
      TuDiShiYongQuanMianJi: "",
      ShiYongQiXian: "",
      TuDiQuanLiXingZhi: "",
      DuYongTuDiMianJi: "",
      QiShiShiJian: "",
      ZhongZhiShiJian: "",
      TuDiYongTu: "",
      FenTanTuDiMianJi: "",
      QuanLiXingZhi: "",
      PingGuJinE: "",
      FangWuLeiXing: "",
      QuanLiQiTaZhuangKuang: "",
      FuJi: "",
      RYXXList: [
        {
          RYLX: "0",
          MC: "",
          ZJLX: "",
          ZJHM: "",
          DH: "",
          QLRXZ: "",
        },
        {
          RYLX: "2",
          MC: "",
          ZJLX: "",
          ZJHM: "",
          DH: "",
          QLRXZ: "",
        },
      ],
    },
    //  询问笔录
    bilv: {
      buyerName: "",
      buyerMean: "",
      buyerIsAlone: "",
      buyerIsMutual: "",
      buyerCommunalShare: "",
      buyerIsCorrect: "",
      buyerDuty: "",
      buyerEms: "",
      buyerOther: "",
      buyerTime: moment().format("YYYY年MM月DD"),
    },
  };
  //  查询参数
  queryData = {
    cqzh: "",
    xgry: [{ ryxm: "", zjzl: 1, zjhm: "" }],
    // cqzh: "赣(2018)新余市不动产权第0039764号",
    // xgry: [{ ryxm: "杨新夫", zjzl: 1, zjhm: "360502196601237759" }],
  };

  async getQueryDocData(): Promise<void> {
    let interface_id = this.storage.get("globalConfig").apis.bdccx;
    this.$store.commit("loader/setOption", "获取不动产信息...");
    const res = await gftApi.getGate(interface_id, this.queryData);
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.code == 200) {
        this.active++;
        res.data.data = JSON.parse(res.data.data);
        if (res.data.data) {
          this.toggleData(res.data.data[0]);
        }
      }
    }
    this.$store.commit("loader/setOption", false);
  }

  toggleData(data: any): void {
    this.form.dataInfo.RYXXList = data.xgry.map((item: any) => {
      return {
        RYLX: item.rylx,
        MC: item.ryxm,
        ZJLX: item.zjzl,
        ZJHM: item.zjhm,
        DH: item.dhhm,
        QLRXZ: item.qlrxz,
      };
    });
    this.form.dataInfo.FangWuQuanZhengHao = data.cqzh;
    this.form.dataInfo.FangWuYongTu = data.yt;
    this.form.dataInfo.JianZhuMianJi = data.mj;
    this.form.dataInfo.JunGongShiJian = data.jgrq;
    this.form.dataInfo.ZuoLuo = data.zl;
    this.form.dataInfo.XGZH = data.dyqd
      .map((item: { bdcdyh: string }) => item.bdcdyh)
      .join();
    this.form.dataInfo.TuDiQuanLiLeiXing = data.tdqllx;
    this.form.dataInfo.ShiYongQiXian = data.syqx;
    this.form.dataInfo.TuDiQuanLiXingZhi = data.tdqlxz;
    this.form.dataInfo.TuDiYongTu = data.tdyt;
    this.form.dataInfo.FangWuJieGou = data.fwjg;
    this.form.dataInfo.QuanLiLeiXing = data.qllx;
    this.form.dataInfo.QuanLiXingZhi = data.qlxz;
    this.form.dataInfo.TaoNaJianZhuMianJi = data.tnjzmj;
    this.form.dataInfo.FenTanJianZhuMianJi = data.ftjzmj;
    this.form.dataInfo.FuJi = data.fj;
  }

  setData(): void {
    //  文档基础表
    this.form.base.located = this.form.dataInfo.ZuoLuo;
    this.form.base.certificateCode = this.form.dataInfo.XGZH;
    this.form.base.unitNum = this.form.dataInfo.BuDongChanDanYuanHao;
    this.form.base.area = this.form.dataInfo.JianZhuMianJi;
    this.form.base.use = this.form.dataInfo.FangWuYongTu;
    this.form.base.remarks = this.form.dataInfo.FuJi;
    //  文档申请权利人
    this.form.ri.waterNum = this.form.dataInfo.ShuiKeHuBianHao;
    this.form.ri.elNum = this.form.dataInfo.DianKeHuBianHao;
    this.form.ri.gasNum = this.form.dataInfo.RanQiKeHuBianHao;
    this.form.ri.tvNum = this.form.dataInfo.DianShi;
    //  权利人相关信息
    let riKey = this.form.dataInfo.RYXXList.findIndex(
      (item: any) => item.RYLX == 0
    );
    let agentKey = this.form.dataInfo.RYXXList.findIndex(
      (item: any) => item.RYLX == 1
    );
    if (riKey >= 0) {
      this.form.ri.rightName = this.form.dataInfo.RYXXList[riKey].MC;
      this.form.ri.ri_identityType = utils.getDictLabel(
        this.dict.zjlx,
        this.form.dataInfo.RYXXList[riKey].ZJLX
      );
      this.form.ri.ri_IdNum = this.form.dataInfo.RYXXList[riKey].ZJHM;
      this.form.ri.ri_principalTel = this.form.dataInfo.RYXXList[riKey].DH;
    }
    if (agentKey >= 0) {
      this.form.ri.ri_agentName = this.form.dataInfo.RYXXList[agentKey].MC;
      this.form.ri.ri_agentTel = this.form.dataInfo.RYXXList[agentKey].DH;
    }
    //  文档义务人
    let obKey = this.form.dataInfo.RYXXList.findIndex(
      (item: any) => item.RYLX == 2
    );
    let agentObKey = this.form.dataInfo.RYXXList.findIndex(
      (item: any) => item.RYLX == 3
    );
    //  文档义务人相关信息
    if (obKey >= 0) {
      this.form.ob.obligeeName = this.form.dataInfo.RYXXList[obKey].MC;
      this.form.ob.ob_identityType = utils.getDictLabel(
        this.dict.zjlx,
        this.form.dataInfo.RYXXList[obKey].ZJLX
      );
      this.form.ob.ob_IdNum = this.form.dataInfo.RYXXList[obKey].ZJHM;
      this.form.ob.ob_principalTel = this.form.dataInfo.RYXXList[obKey].DH;
    }
    if (agentObKey >= 0) {
      this.form.ob.ob_agentName = this.form.dataInfo.RYXXList[agentObKey].MC;
      this.form.ob.ob_agentTel = this.form.dataInfo.RYXXList[agentObKey].DH;
    }

    this.storage.set("forms", [
      {
        path: "二手房转移登记及水电气联动过户",
        type: ".docx",
        form: {
          ...this.form.base,
          ...this.form.ri,
          ...this.form.ob,
        },
      },
      {
        path: "询问笔录",
        type: ".docx",
        form: this.form.bilv,
      },
    ]);
    this.storage.set("dataInfo", this.form.dataInfo);
    this.$router.push({
      name: "sign",
    });
  }

  next(): void {
    switch (this.active) {
      case 0:
        this.getQueryDocData();
        break;
      case 3:
        this.setData();
        break;
      default:
        this.active++;
        break;
    }
  }

  addXGRY(): void {
    this.form.dataInfo.RYXXList.push({
      RYLX: null,
      MC: "",
      ZJLX: null,
      ZJHM: "",
      DH: "",
      QLRXZ: null,
    });
  }
  delXGRY(key: number): void {
    this.form.dataInfo.RYXXList.splice(key, 1);
  }
}
</script>

<template>
  <van-form class="rg-form" @submit="next">
    <div class="rg-form-data">
      <van-steps :active="active" active-color="#38f">
        <van-step>查询</van-step>
        <van-step>相关人员</van-step>
        <van-step>不动产</van-step>
        <van-step>询问笔录</van-step>
        <van-step>签署</van-step>
      </van-steps>
      <div v-show="active == 0">
        <van-cell-group style="margin-top: 8px">
          <van-field
            label="产权证号"
            v-model="queryData.cqzh"
            placeholder="请填写产权证号"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="相关人员" titleClass="sub-title" />
          <div
            class="ryxx-item"
            v-for="(item, index) in queryData.xgry"
            :key="index"
          >
            <van-field
              label="姓名"
              v-model="item.ryxm"
              placeholder="请填写姓名"
            />
            <RGPicker
              :value.sync="item.zjzl"
              :localData="dict.zjlx"
              label="证件类型"
              placeholder="请选择证件类型"
            />
            <van-field
              label="证件编号"
              v-model="item.zjhm"
              placeholder="请填写证件编号"
            />
          </div>
        </van-cell-group>
      </div>
      <div v-show="active == 1">
        <van-cell-group style="margin-top: 8px">
          <van-cell-group
            v-for="(item, index) in form.dataInfo.RYXXList"
            :key="index"
          >
            <van-cell :title="`人员${index + 1}`" titleClass="sub-title" />
            <RGPicker
              :value.sync="item.RYLX"
              :localData="dict.rylx"
              placeholder="请选择人员类型"
              label="人员类型"
              :rules="[{ required: active == 1, message: '请选择人员类型' }]"
            />
            <RGPicker
              :value.sync="item.QLRXZ"
              :localData="dict.QLRXZ"
              placeholder="请选择人员性质"
              label="人员性质"
              :rules="[{ required: active == 1, message: '请选择人员性质' }]"
            />
            <van-field
              label="名称"
              v-model="item.MC"
              placeholder="请填写名称"
              required
              :rules="[{ required: active == 1, message: '请填写名称' }]"
            />
            <van-field
              label="联系电话"
              v-model="item.DH"
              placeholder="请填写联系电话"
              required
              :rules="[{ required: active == 1, message: '请填写联系电话' }]"
            />
            <RGPicker
              :value.sync="item.ZJLX"
              :localData="dict.zjlx"
              placeholder="请选择证件类型"
              label="证件类型"
              :rules="[{ required: active == 1, message: '请选择证件类型' }]"
            />
            <van-field
              label="证件号码"
              v-model="item.ZJHM"
              placeholder="请填写证件号码"
              required
              :rules="[{ required: active == 1, message: '请填写证件号码' }]"
            />
            <van-cell v-if="index">
              <van-button round type="warning" block @click="delXGRY(index)">
                删除
              </van-button>
            </van-cell>
          </van-cell-group>
        </van-cell-group>
      </div>
      <div v-show="active == 2">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="登记事由" titleClass="sub-title" />
          <RGPicker
            :value.sync="form.dataInfo.DengJiDaLei"
            :localData="dict.DengJiDaLei"
            placeholder="请选择登记大类"
            label="登记大类"
            :rules="[{ required: active == 2, message: '请选择登记大类' }]"
          />
          <RGPicker
            :value.sync="form.dataInfo.DengJiXiaoLei"
            :localData="dict.DengJiXiaoLei"
            placeholder="请选择登记小类"
            label="登记小类"
            :rules="[{ required: active == 2, message: '请选择登记小类' }]"
          />
          <RGPicker
            :value.sync="form.dataInfo.DengJiYuanYin"
            :localData="dict.DengJiYuanYin"
            placeholder="请选择登记原因"
            label="登记原因"
            :rules="[{ required: active == 2, message: '请选择登记原因' }]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="合同信息" titleClass="sub-title" />
          <van-field
            label="合同编号"
            v-model="form.dataInfo.HeTongBianHao"
            placeholder="请填写合同编号"
            required
            :rules="[{ required: active == 2, message: '请填写合同编号' }]"
          />
          <van-field
            label="合同总价"
            v-model="form.dataInfo.HeTongZongJiaWanYuan"
            placeholder="请填写合同总价(万元)"
            required
            :rules="[{ required: active == 2, message: '请填写合同总价' }]"
          />
          <van-field
            label="评估金额"
            v-model="form.dataInfo.PingGuJinE"
            placeholder="请填写评估金额"
            required
            :rules="[{ required: active == 2, message: '请填写评估金额' }]"
          />
          <van-field
            label="合同金额"
            v-model="form.dataInfo.HeTongJinE"
            placeholder="请填写合同金额"
            required
            :rules="[{ required: active == 2, message: '请填写合同金额' }]"
          />
          <RGDataPicker
            label="签订日期"
            :value.sync="form.dataInfo.HeTongQianDingRiQi"
            :rules="[{ required: active == 2, message: '请填写签订日期' }]"
          />
          <RGPicker
            label="打印类型"
            :value.sync="form.dataInfo.HeTongDaYinLeiXing"
            :localData="dict.HeTongDaYinLeiXing"
            placeholder="请选择合同打印类型"
            :rules="[{ required: active == 2, message: '请选择合同打印类型' }]"
          />
          <van-field
            type="digit"
            label="打印份数"
            v-model="form.dataInfo.HeTongDaYinFenShu"
            placeholder="请填写合同打印份数"
            :rules="[{ required: active == 2, message: '请填写合同打印份数' }]"
          />
          <van-field
            type="digit"
            label="各执份数"
            v-model="form.dataInfo.GeZhiFenShu"
            placeholder="请填写合同各执份数"
            :rules="[{ required: active == 2, message: '请填写合同各执份数' }]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="相关证号" titleClass="sub-title" />
          <van-field
            label="单元号"
            v-model="form.dataInfo.BuDongChanDanYuanHao"
            placeholder="请填写单元号"
            required
            :rules="[{ required: active == 2, message: '请填写单元号' }]"
          />
          <van-field
            label="产权证号"
            v-model="form.dataInfo.XGZH"
            placeholder="请填写产权证号"
            required
            :rules="[{ required: active == 2, message: '请填写产权证号' }]"
          />
          <van-field
            v-model="form.dataInfo.GongYouQuanZhengHao"
            label="共有权证号"
            placeholder="请填写共有权证号"
            required
            :rules="[{ required: active == 2, message: '请填写共有权证号' }]"
          />
          <van-field
            v-model="form.dataInfo.FangWuQuanZhengHao"
            label="房屋权证号"
            placeholder="请填写房屋权证号"
            required
            :rules="[{ required: active == 2, message: '请填写房屋权证号' }]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="房屋信息" titleClass="sub-title" />
          <van-field
            label="房屋坐落"
            v-model="form.dataInfo.ZuoLuo"
            placeholder="请填写房屋坐落"
            required
            :rules="[{ required: active == 2, message: '请填写房屋坐落' }]"
          />
          <RGPicker
            label="房屋类型"
            :value.sync="form.dataInfo.FangWuLeiXing"
            :localData="dict.FangWuLeiXing"
            placeholder="请选择房屋类型"
            :rules="[{ required: active == 2, message: '请选择房屋类型' }]"
          />
          <RGPicker
            label="房屋结构"
            :value.sync="form.dataInfo.FangWuJieGou"
            :localData="dict.FangWuJieGou"
            placeholder="请选择房屋结构"
            :rules="[{ required: active == 2, message: '请选择房屋结构' }]"
          />
          <RGPicker
            label="房屋来源"
            :value.sync="form.dataInfo.QuDeFangShi"
            :localData="dict.QuDeFangShi"
            placeholder="请选择房屋来源"
            :rules="[{ required: active == 2, message: '请选择房屋来源' }]"
          />
          <RGPicker
            label="房屋用途"
            :value.sync="form.dataInfo.FangWuYongTu"
            :localData="dict.FangWuYongTu"
            placeholder="请选择房屋用途"
            :rules="[{ required: active == 2, message: '请选择房屋用途' }]"
          />
          <RGPicker
            label="土地用途"
            :value.sync="form.dataInfo.TuDiYongTu"
            :localData="dict.TuDiYongTu"
            placeholder="请选择土地用途"
            :rules="[{ required: active == 2, message: '请选择土地用途' }]"
          />
          <van-field
            label="规划用途"
            v-model="form.dataInfo.GuiHuaYongTu"
            placeholder="请填写规划用途"
            required
            :rules="[{ required: active == 2, message: '请填写规划用途' }]"
          />
          <van-field
            type="digit"
            label="使用期限"
            v-model="form.dataInfo.ShiYongQiXian"
            placeholder="请填写使用期限"
            required
            :rules="[{ required: active == 2, message: '请填写使用期限' }]"
          />
          <RGDataPicker
            label="起始时间"
            :value.sync="form.dataInfo.QiShiShiJian"
            :rules="[{ required: active == 2, message: '请填写起始时间' }]"
          />
          <RGDataPicker
            label="终止时间"
            :value.sync="form.dataInfo.ZhongZhiShiJian"
            :rules="[{ required: active == 2, message: '请填写终止时间' }]"
          />
          <RGPicker
            label="权利类型"
            :value.sync="form.dataInfo.QuanLiLeiXing"
            :localData="dict.QuanLiLeiXing"
            placeholder="请填写权利类型"
            :rules="[{ required: active == 2, message: '请填写权利类型' }]"
          />
          <RGPicker
            label="权利性质"
            :value.sync="form.dataInfo.QuanLiXingZhi"
            :localData="dict.QuanLiXingZhi"
            placeholder="请填写权利性质"
            :rules="[{ required: active == 2, message: '请填写权利性质' }]"
          />
          <RGPicker
            label="土地权利类型"
            :value.sync="form.dataInfo.TuDiQuanLiLeiXing"
            :localData="dict.TuDiQuanLiLeiXing"
            placeholder="请填写土地权利类型"
            :rules="[{ required: active == 2, message: '请填写土地权利类型' }]"
          />
          <RGPicker
            label="土地权利性质"
            :value.sync="form.dataInfo.TuDiQuanLiXingZhi"
            :localData="dict.TuDiQuanLiXingZhi"
            placeholder="请填写土地权利性质"
            :rules="[{ required: active == 2, message: '请填写土地权利性质' }]"
          />
          <van-field
            label="权利其他状况"
            v-model="form.dataInfo.PingGuJinE"
            placeholder="请填写权利其他状况"
            required
            :rules="[{ required: active == 2, message: '请填写权利其他状况' }]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="占地面积" titleClass="sub-title" />
          <van-field
            label="建筑面积"
            v-model="form.dataInfo.JianZhuMianJi"
            placeholder="请填写建筑面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写建筑面积' }]"
          />
          <van-field
            v-model="form.dataInfo.ZongDiMianJi"
            label="宗地面积"
            placeholder="请填写宗地面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写宗地面积' }]"
          />
          <van-field
            v-model="form.dataInfo.FenTanJianZhuMianJi"
            label="分摊建筑面积"
            placeholder="请填写分摊建筑面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写分摊建筑面积' }]"
          />
          <van-field
            label="分摊土地面积"
            v-model="form.dataInfo.FenTanTuDiMianJi"
            placeholder="请填写分摊土地面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写分摊土地面积' }]"
          />
          <van-field
            v-model="form.dataInfo.TaoNaJianZhuMianJi"
            label="套内建筑面积"
            placeholder="请填写套内建筑面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写套内建筑面积' }]"
          />
          <van-field
            label="建筑占地面积"
            v-model="form.dataInfo.JianZhuWuZhanDiMianJi"
            placeholder="请填写建筑占地面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写建筑占地面积' }]"
          />
          <van-field
            label="独用土地面积"
            v-model="form.dataInfo.DuYongTuDiMianJi"
            placeholder="请填写独用土地面积(㎡)"
            required
            :rules="[{ required: active == 2, message: '请填写独用土地面积' }]"
          />
          <van-field
            label="土地使用面积"
            v-model="form.dataInfo.TuDiShiYongQuanMianJi"
            placeholder="请填写土地使用权面积(㎡)"
            required
            :rules="[
              { required: active == 2, message: '请填写土地使用权面积' },
            ]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="交易方式" titleClass="sub-title" />
          <RGPicker
            label="交付方式"
            :value.sync="form.dataInfo.FangKuanJiaoFuFangShi"
            :localData="dict.FangKuanJiaoFuFangShi"
            placeholder="请填写房款交付方式"
            :rules="[{ required: active == 2, message: '请填写房款交付方式' }]"
          />
          <RGDataPicker
            label="竣工时间"
            :value.sync="form.dataInfo.JunGongShiJian"
            :rules="[{ required: active == 2, message: '请填写竣工时间' }]"
          />
          <RGDataPicker
            label="甲方交房日期"
            :value.sync="form.dataInfo.JiaFangJiaoFangRiQi"
            :rules="[{ required: active == 2, message: '请填写甲方交房日期' }]"
          />
          <RGDataPicker
            label="自行办理日期"
            :value.sync="form.dataInfo.ZiXingBanLiRiQi"
            :rules="[{ required: active == 2, message: '请填写自行办理日期' }]"
          />
          <RGPicker
            label="争议解决方式"
            :value.sync="form.dataInfo.ShuangFangZhengYiJieJueFangShi"
            :localData="dict.ShuangFangZhengYiJieJueFangShi"
            placeholder="请填写争议解决方式"
            :rules="[{ required: active == 2, message: '请填写争议解决方式' }]"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="水过户" titleClass="sub-title" />
          <van-field
            label="水部门"
            v-model="form.dataInfo.ShuiBuMen"
            placeholder="请填写相关供应部门"
          />
          <van-field
            label="水号"
            v-model="form.dataInfo.ShuiKeHuBianHao"
            placeholder="请填写水号"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="供电过户" titleClass="sub-title" />
          <van-field
            label="电部门"
            v-model="form.dataInfo.DianBuMen"
            placeholder="请填写相关供应部门"
          />
          <van-field
            label="电号"
            v-model="form.dataInfo.DianKeHuBianHao"
            placeholder="请填写电号"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="燃气过户" titleClass="sub-title" />
          <van-field
            label="燃气部门"
            v-model="form.dataInfo.RanQiBuMen"
            placeholder="请填写相关供应部门"
          />
          <van-field
            label="燃气号"
            v-model="form.dataInfo.RanQiKeHuBianHao"
            placeholder="请填写燃气号"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="报装有线电视" titleClass="sub-title" />
          <van-field
            label="电视供应商"
            v-model="form.dataInfo.DianShi"
            placeholder="请填写电视供应商"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="报装宽带" titleClass="sub-title" />
          <van-field
            label="网络供应商"
            v-model="form.dataInfo.WangLuo"
            placeholder="请填写网络供应商"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="补充条款" titleClass="sub-title" />
          <van-field
            type="textarea"
            rows="7"
            autosize
            maxlength="120"
            show-word-limit
            v-model="form.dataInfo.BuChongTiaoKuan"
            placeholder="请填写补充条款"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="备注" titleClass="sub-title" />
          <van-field
            type="textarea"
            rows="7"
            autosize
            maxlength="120"
            show-word-limit
            v-model="form.dataInfo.FuJi"
            placeholder="请填写备注"
          />
        </van-cell-group>
      </div>
      <div v-show="active == 3">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="不动产登记询问笔录" titleClass="sub-title" />
          <van-cell title="询问人" />
          <van-field
            v-model="form.bilv.buyerName"
            placeholder="请填写询问人"
            required
            :rules="[{ required: active == 3, message: '请填写询问人' }]"
          />
          <van-cell title="申请登记事项是否为申请人真实意思表示？" />
          <RGPicker
            :value.sync="form.bilv.buyerMean"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
            :rules="[{ required: active == 3, message: '请填写是或否' }]"
          />
          <van-cell title="申请登记的房地产是共有还是单独所有？" />
          <RGPicker
            :value.sync="form.bilv.buyerIsAlone"
            :localData="[
              { text: '共有', value: '共有' },
              { text: '单独所有', value: '单独所有' },
            ]"
            placeholder="请填写共有或单独所有"
            :rules="[
              { required: active == 3, message: '请填写共有或单独所有' },
            ]"
          />
          <van-cell title="申请登记的房地产是按份共有，还是共同共有？" />
          <RGPicker
            :value.sync="form.bilv.buyerIsMutual"
            :localData="[
              { text: '按份共有', value: '按份共有' },
              { text: '共同共有', value: '共同共有' },
            ]"
            :rules="[
              {
                required: active == 3,
                message: '共有情况下，请填写是按份共有或共同共有',
              },
            ]"
            placeholder="共有情况下，请填写是按份共有或共同共有"
          />
          <van-cell title="申请登记的房地产共有份额情况？" />
          <van-field
            v-model="form.bilv.buyerCommunalShare"
            placeholder="按份共有下，请填写共有具体份额。共同共有人不填写"
            required
            :rules="[
              {
                required: active == 3,
                message: '按份共有下，请填写共有具体份额。共同共有人不填写',
              },
            ]"
          />
          <van-cell title="申请异议登记时，权利人是否不同意办理更正登记？" />
          <van-field
            v-model="form.bilv.buyerIsCorrect"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
            required
            :rules="[
              {
                required: active == 3,
                message: '申请异议登记时，权利人是否不同意办理更正登记？',
              },
            ]"
          />
          <van-cell title="申请异议登记时，是否已知悉异议不当应承担的责任？" />
          <van-field
            v-model="form.bilv.buyerDuty"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
            required
            :rules="[
              {
                required: active == 3,
                message: '申请异议登记时填写，申请其他登记不填写本栏',
              },
            ]"
          />
          <van-cell title="是否需要快递邮寄证书?" />
          <RGPicker
            :value.sync="form.bilv.buyerEms"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
            :rules="[
              {
                required: active == 3,
                message: '请填写是或否',
              },
            ]"
          />
          <van-cell title="其他需要询问的有关事项" />
          <van-field
            v-model="form.bilv.buyerOther"
            placeholder="其他需要询问的有关事项"
            required
            :rules="[
              {
                required: active == 3,
                message: '其他需要询问的有关事项',
              },
            ]"
          />
        </van-cell-group>
      </div>
    </div>
    <div style="margin: 12px">
      <van-button
        v-if="active == 1"
        round
        type="info"
        block
        @click="addXGRY()"
        native-type="button"
        style="margin-top: 8px"
      >
        添加参与人员
      </van-button>
      <van-button
        v-if="active > 0"
        round
        type="danger"
        block
        @click="active--"
        style="margin-top: 8px"
      >
        上一步
      </van-button>
      <van-button
        round
        type="info"
        block
        native-type="submit"
        style="margin-top: 8px"
      >
        下一步
      </van-button>
    </div>
  </van-form>
</template>

<style scoped lang="less">
.rg-form {
  .rg-form-data {
    min-height: calc(100vh - 128px);
  }
  .sub-title {
    font-size: 16px;
    color: #38f;
    font-weight: 700;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  }
}
</style>
