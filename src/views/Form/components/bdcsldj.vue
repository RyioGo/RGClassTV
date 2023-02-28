<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
//  for node_modules api
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
//  for you api
import formDict from "./dict";
//  for you ts

//  for you components
import RGPicker from "@/components/RGPicker/index.vue";
import RGDataPicker from "@/components/RGDataPicker/index.vue";
@Component({
  components: { RGPicker, RGDataPicker },
})
export default class bdcsldjCom extends Vue {
  //  表单步骤
  public active = 3;
  //   表单字典
  public dict = formDict.bdcdjsl;
  //   表单数据
  public form = {
    info: {
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
      ri_identityType: "",
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
      ob_identityType: "",
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
      DengJiDaLei: "",
      DengJiXiaoLei: "",
      DengJiYuanYin: "",
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
      RYXXList: [],
    },
    //合同
    hetong: {
      contractNO: "",
      sellerName: "",
      sellerIdCard: "",
      buyerName: "",
      buyerIdCard: "",
      houseAddress: "",
      housePurpose: "",
      houseConstruction: "",
      houseArea: "",
      houseCompletion: "",
      houseNumber: "",
      houseMutualNum: "",
      houseSumMoney: "",
      houseSumMoneyCase: "",
      houseAverageMoney: "",
      houseSolveWay: "",
      houseDeliveryDay: "",
      houseTransferProcedureDay: "",
      houseConsultWithWay: "",
      contractNum: "",
      contractAverageNum: "",
      contractOther: "",
      sellerAgentTel: "",
      buyerAgentTel: "",
      createTime: "",
    },
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
      buyerTime: "",
      sellerName: "",
      sellerMean: "",
      sellerIsAlone: "",
      sellerIsMutual: "",
      sellerCommunalShare: "",
      sellerIsCorrect: "",
      sellerDuty: "",
      sellerEms: "",
      sellerOther: "",
      sellerTime: "",
    },
    marriage: {
      buy: {
        name: "张三丰",
        gender: "男",
        credentialName: "身份证",
        credentialNum: "362421198803288965",
        noSpouse: "本人承诺无配偶",
        divorceTime: "2024年1月22日",
        dieTime: "2024年2月24日",
        creteTime: "2024年2月24日",
      },
      sell: {
        name: "张三丰",
        gender: "男",
        credentialName: "身份证",
        credentialNum: "362421198803288965",
        noSpouse: "本人承诺无配偶",
        divorceTime: "2024年1月22日",
        dieTime: "2024年2月24日",
        creteTime: "2024年2月24日",
      },
      gzs_buy: {
        name: "张三丰",
        credentialName: "身份证",
        credentialNum: "362421198803288965",
        spouseName: "山本英子",
        spouseNum: "362421198803288961",
        childName1: "张老大",
        childNum1: "362421198803288962",
        childName2: "张老二",
        childNum2: "362421198803288963",
        location: "新余市仙女湖区XXX幸福里小区23栋1202号",
        option1: false,
        option2: false,
        option3: true,
        creteTime: "2024年2月24日",
      },
      gzs_sell: {
        name: "张三丰",
        credentialName: "身份证",
        credentialNum: "362421198803288965",
        spouseName: "山本英子",
        spouseNum: "362421198803288961",
        childName1: "张老大",
        childNum1: "362421198803288962",
        childName2: "张老二",
        childNum2: "362421198803288963",
        location: "新余市仙女湖区XXX幸福里小区23栋1202号",
        option: true,
        creteTime: "2024年2月24日",
      },
      tc_buy: {},
      tc_sell: {},
    },
  };

  public getNoSpouse(date1: string, date2: string): string {
    if (date1) {
      return `本人于${date1}离婚后至今未再婚`;
    }
    if (date2) {
      return `本人于${date2}日丧偶至今未再婚`;
    }
    return "本人至今从未登记结婚";
  }

  public toPath() {
    if (this.active >= 3) {
      this.setData();
      this.$router.push({
        name: "sign",
      });
    } else {
      this.active++;
      window.scrollTo(0, 0);
    }
  }

  public back() {
    this.active--;
    window.scrollTo(0, 0);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public setData() {
    this.form.info.located = this.form.dataInfo.ZuoLuo;
    this.form.info.certificateCode = this.form.dataInfo.XGZH;
    this.form.info.unitNum = this.form.dataInfo.BuDongChanDanYuanHao;
    this.form.info.area = this.form.dataInfo.JianZhuMianJi;
    this.form.info.use = this.form.dataInfo.FangWuYongTu;
    this.form.info.remarks = this.form.dataInfo.FuJi;
    this.form.ri.waterNum = this.form.dataInfo.ShuiKeHuBianHao;
    this.form.ri.elNum = this.form.dataInfo.DianKeHuBianHao;
    this.form.ri.gasNum = this.form.dataInfo.RanQiKeHuBianHao;
    this.form.ri.tvNum = this.form.dataInfo.DianShi;

    (this.form.dataInfo.RYXXList as any) = [
      {
        RYLX: "权利人",
        MC: this.form.ri.rightName,
        ZJLX: this.form.ri.ri_identityType,
        ZJHM: this.form.ri.ri_IdNum,
        DH: this.form.ri.ri_principalTel,
        QLRXZ: this.form.ri.QLRXZ,
      },
      {
        RYLX: "义务人",
        MC: this.form.ob.obligeeName,
        ZJLX: this.form.ob.ob_identityType,
        ZJHM: this.form.ob.ob_IdNum,
        DH: this.form.ob.ob_principalTel,
        QLRXZ: this.form.ob.QLRXZ,
      },
      {
        RYLX: "权利人代理人",
        MC: this.form.ri.ri_agentName,
        DH: this.form.ri.ri_agentTel,
      },
      {
        RYLX: "义务人代理人",
        MC: this.form.ob.ob_agentName,
        DH: this.form.ob.ob_agentTel,
      },
    ];

    this.form.hetong.contractNO = this.form.dataInfo.HeTongBianHao;
    this.form.hetong.sellerName = this.form.ri.rightName;
    this.form.hetong.buyerName = this.form.ob.obligeeName;
    this.form.hetong.sellerIdCard = this.form.ri.ri_IdNum;
    this.form.hetong.buyerIdCard = this.form.ob.ob_IdNum;
    this.form.hetong.houseAddress = this.form.dataInfo.ZuoLuo;
    this.form.hetong.housePurpose = this.form.dataInfo.GuiHuaYongTu;
    this.form.hetong.houseConstruction = this.form.dataInfo.FangWuJieGou;
    this.form.hetong.houseArea = this.form.dataInfo.JianZhuMianJi;
    this.form.hetong.houseCompletion = this.form.dataInfo.JunGongShiJian;
    this.form.hetong.houseNumber = this.form.dataInfo.FangWuQuanZhengHao;
    this.form.hetong.houseMutualNum = this.form.dataInfo.GongYouQuanZhengHao;
    this.form.hetong.houseSolveWay = this.form.dataInfo.FangKuanJiaoFuFangShi;
    this.form.hetong.houseDeliveryDay = this.form.dataInfo.JiaFangJiaoFangRiQi;
    this.form.hetong.houseTransferProcedureDay =
      this.form.dataInfo.ZiXingBanLiRiQi;
    this.form.hetong.houseConsultWithWay =
      this.form.dataInfo.ShuangFangZhengYiJieJueFangShi;
    this.form.hetong.contractNum = this.form.dataInfo.HeTongDaYinFenShu;
    this.form.hetong.contractAverageNum = this.form.dataInfo.GeZhiFenShu;
    this.form.hetong.contractOther = this.form.dataInfo.BuChongTiaoKuan;
    this.form.hetong.sellerAgentTel = this.form.ri.ri_principalTel;
    this.form.hetong.buyerAgentTel = this.form.ob.ob_principalTel;
    this.form.hetong.createTime = this.form.dataInfo.HeTongQianDingRiQi;

    this.form.bilv.buyerTime = moment().format("YYYY年MM月DD");
    this.form.bilv.sellerTime = moment().format("YYYY年MM月DD");

    //  婚姻状况-买
    this.form.marriage.buy.noSpouse = this.getNoSpouse(
      this.form.marriage.buy.divorceTime,
      this.form.marriage.buy.dieTime
    );
    this.form.marriage.buy.creteTime = moment().format("YYYY年MM月DD");
    // 税务证明文档-买
    this.form.marriage.gzs_buy.name = this.form.marriage.buy.name;
    this.form.marriage.gzs_buy.credentialName =
      this.form.marriage.buy.credentialName;
    this.form.marriage.gzs_buy.credentialNum =
      this.form.marriage.buy.credentialNum;
    this.form.marriage.gzs_buy.creteTime = moment().format("YYYY年MM月DD");
    //  婚姻状况-售卖
    this.form.marriage.sell.noSpouse = this.getNoSpouse(
      this.form.marriage.sell.divorceTime,
      this.form.marriage.sell.dieTime
    );
    this.form.marriage.sell.creteTime = moment().format("YYYY年MM月DD");
    // 税务证明文档-售卖
    this.form.marriage.gzs_sell.name = this.form.marriage.sell.name;
    this.form.marriage.gzs_sell.credentialName =
      this.form.marriage.sell.credentialName;
    this.form.marriage.gzs_sell.credentialNum =
      this.form.marriage.sell.credentialNum;
    this.form.marriage.gzs_sell.creteTime = moment().format("YYYY年MM月DD");
    // 买卖套次文档
    this.form.marriage.tc_buy = this.form.marriage.gzs_buy;
    this.form.marriage.tc_sell = this.form.marriage.gzs_sell;

    this.storage.set("forms", [
      {
        path: "二手房转移登记及水电气联动过户",
        type: ".docx",
        form: {
          ...this.form.info,
          ...this.form.ri,
          ...this.form.ob,
        },
      },
      {
        path: "不动产房屋买卖合同签署文件",
        type: ".docx",
        form: this.form.hetong,
      },
      {
        path: "询问笔录",
        type: ".docx",
        form: this.form.bilv,
      },
      {
        path: "婚姻状况承诺书（买方）",
        type: ".docx",
        form: this.form.marriage.buy,
      },
      {
        path: "婚姻状况承诺书（卖方）",
        type: ".docx",
        form: this.form.marriage.sell,
      },
      // {
      //   path: "税务证明事项告知承诺书（承受方）",
      //   type: ".docx",
      //   form: this.form.marriage.gzs_buy,
      // },
      // {
      //   path: "税务证明事项告知承诺书（转让方）",
      //   type: ".docx",
      //   form: this.form.marriage.gzs_sell,
      // },
      {
        path: "套次承诺书（承受方）",
        type: ".docx",
        form: this.form.marriage.tc_buy,
      },
      {
        path: "套次承诺书（转让方）",
        type: ".docx",
        form: this.form.marriage.tc_sell,
      },
    ]);
    this.storage.set("dataInfo", this.form.dataInfo);
  }
}
</script>

<template>
  <div class="rg-form">
    <van-form class="rg-form-data">
      <van-steps :active="active" active-color="#38f">
        <van-step>默认</van-step>
        <van-step>申请人</van-step>
        <van-step>不动产</van-step>
        <van-step>婚姻状况</van-step>
        <van-step>询问笔录</van-step>
        <van-step>签章</van-step>
      </van-steps>
      <div v-show="active == 0">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="合同信息" titleClass="sub-title" />
          <van-field
            label="合同编号"
            v-model="form.dataInfo.HeTongBianHao"
            placeholder="请填写合同编号"
          />
          <van-field
            label="合同总价"
            v-model="form.dataInfo.HeTongZongJiaWanYuan"
            placeholder="请填写合同总价(万元)"
          />
          <van-field
            label="合同金额"
            v-model="form.dataInfo.HeTongJinE"
            placeholder="请填写合同金额"
          />
          <RGPicker
            label="交易类型"
            :value.sync="form.dataInfo.JiaoYiLeiXing"
            :localData="dict.JiaoYiLeiXing"
            placeholder="请选择交易类型"
          />
          <van-field
            label="交易价格"
            v-model="form.dataInfo.JiaoYiJiaGe"
            placeholder="请填写交易价格"
          />
          <van-field
            label="单价"
            v-model="form.dataInfo.DanJiaWanYuan"
            placeholder="请填写单价(万元)"
          />
          <RGPicker
            label="打印类型"
            :value.sync="form.dataInfo.HeTongDaYinLeiXing"
            :localData="dict.HeTongDaYinLeiXing"
            placeholder="请选择合同打印类型"
          />
          <van-field
            label="打印份数"
            v-model="form.dataInfo.HeTongDaYinFenShu"
            placeholder="请填写合同打印份数"
          />
          <van-field
            label="各执份数"
            v-model="form.dataInfo.GeZhiFenShu"
            placeholder="请填写合同各执份数"
          />
          <van-field
            v-model="form.dataInfo.HeTongQianDingRiQi"
            label="签订日期"
            placeholder="请填写合同签订日期"
          />
          <van-field
            label="补充条款"
            v-model="form.dataInfo.BuChongTiaoKuan"
            placeholder="请填写补充条款"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="申请登记事由" titleClass="sub-title" />
          <RGPicker
            :value.sync="form.dataInfo.DengJiDaLei"
            :localData="dict.DengJiDaLei"
            placeholder="请选择登记大类"
            label="登记大类"
          />
          <RGPicker
            :value.sync="form.dataInfo.DengJiXiaoLei"
            :localData="dict.DengJiXiaoLei"
            placeholder="请选择登记小类"
            label="登记小类"
          />
          <RGPicker
            :value.sync="form.dataInfo.DengJiYuanYin"
            :localData="dict.DengJiYuanYin"
            placeholder="请选择登记原因"
            label="登记原因"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="不动产情况" titleClass="sub-title" />
          <van-cell v-if="active == 0">
            <van-notice-bar
              color="#1989fa"
              background="#ecf9ff"
              left-icon="info-o"
              speed="40"
            >
              友情提示：根据交易的实际情况，将所有涉及到的不动产证、房产证以及老土地证号填写完整，每个证号中间使用英文“,”隔开
              （系统列出的证号仅作参考，如有需要请按需填写）
            </van-notice-bar>
          </van-cell>
          <van-field
            label="不动产权证号"
            v-model="form.dataInfo.XGZH"
            placeholder="请填写不动产权证号"
          />
          <van-field
            label="不动产单元号"
            v-model="form.dataInfo.BuDongChanDanYuanHao"
            placeholder="请填写不动产单元号"
          />
          <van-field
            v-model="form.dataInfo.GongYouQuanZhengHao"
            label="共有权证号"
            placeholder="请填写共有权证号"
          />
          <van-field
            v-model="form.dataInfo.FangWuQuanZhengHao"
            label="房屋权证号"
            placeholder="请填写房屋权证号"
          />
          <van-field
            label="坐落"
            v-model="form.dataInfo.ZuoLuo"
            placeholder="请填写坐落"
          />
          <RGPicker
            label="房屋结构"
            :value.sync="form.dataInfo.FangWuJieGou"
            :localData="dict.FangWuJieGou"
            placeholder="请选择房屋结构"
          />
          <RGPicker
            label="房屋来源"
            :value.sync="form.dataInfo.QuDeFangShi"
            :localData="dict.QuDeFangShi"
            placeholder="请选择房屋来源"
          />
          <RGPicker
            label="房屋类型"
            :value.sync="form.dataInfo.FangWuLeiXing"
            :localData="dict.FangWuLeiXing"
            placeholder="请选择房屋类型"
          />
          <van-field
            label="建筑面积(㎡)"
            v-model="form.dataInfo.JianZhuMianJi"
            placeholder="请填写建筑面积(㎡)"
          />
          <van-field
            v-model="form.dataInfo.TaoNaJianZhuMianJi"
            label="套内面积(㎡)"
            placeholder="请填写套内建筑面积(㎡)"
          />
          <van-field
            v-model="form.dataInfo.FenTanJianZhuMianJi"
            label="分摊面积(㎡)"
            placeholder="请填写分摊建筑面积(㎡)"
          />
          <van-field
            v-model="form.dataInfo.ZongDiMianJi"
            label="宗地面积(㎡)"
            placeholder="请填写宗地面积(㎡)"
          />
          <van-field
            label="房屋用途"
            v-model="form.dataInfo.FangWuYongTu"
            placeholder="请填写房屋用途"
          />
          <van-field
            label="规划用途"
            v-model="form.dataInfo.GuiHuaYongTu"
            placeholder="请填写规划用途"
          />
          <van-field
            label="房屋总价(万元)"
            v-model="form.hetong.houseSumMoney"
            placeholder="房屋总价(万元)"
          />
          <van-field
            label="房屋总价(大写)"
            v-model="form.hetong.houseSumMoneyCase"
            placeholder="房屋总价(万元)"
          />
          <van-field
            label="房屋总价(计)"
            v-model="form.hetong.houseAverageMoney"
            placeholder="房屋总价(万元)"
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
      </div>
      <div v-show="active == 1">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="权利人信息" titleClass="sub-title" />
          <van-field
            label="权利人姓名"
            v-model="form.ri.rightName"
            placeholder="请填写权利人姓名"
          />
          <RGPicker
            :value.sync="form.ri.QLRXZ"
            :localData="dict.QLRXZ"
            placeholder="请选择权利人性质"
            label="权利人性质"
          />
          <RGPicker
            :value.sync="form.ri.ri_identityType"
            :localData="dict.ZJLX"
            label="证件类型"
            placeholder="请选择证件类型"
          />
          <van-field
            label="证件号"
            v-model="form.ri.ri_IdNum"
            placeholder="请填写证件号"
          />
          <van-field
            label="通讯地址"
            v-model="form.ri.ri_address"
            placeholder="请填写通讯地址"
          />
          <van-field
            label="邮编"
            v-model="form.ri.ri_zipCode"
            placeholder="请填写邮编"
          />
          <van-field
            label="法人/负责人"
            v-model="form.ri.ri_principalName"
            placeholder="请填写法定代表人或负责人"
          />
          <van-field
            label="联系电话"
            v-model="form.ri.ri_principalTel"
            placeholder="请填写联系电话"
          />
          <van-field
            label="代理人姓名"
            v-model="form.ri.ri_agentName"
            placeholder="请填写代理人姓名"
          />
          <van-field
            label="代理人电话"
            v-model="form.ri.ri_agentTel"
            placeholder="请填写代理人电话"
          />
          <van-field
            label="代理机构名称"
            v-model="form.ri.ri_agency"
            placeholder="请填写代理机构名称"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="义务人信息" titleClass="sub-title" />
          <van-field
            label="义务人姓名"
            v-model="form.ob.obligeeName"
            placeholder="请填写义务人姓名"
          />
          <RGPicker
            :value.sync="form.ob.QLRXZ"
            :localData="dict.QLRXZ"
            placeholder="请选择义务人性质"
            label="义务人性质"
          />
          <RGPicker
            :value.sync="form.ob.ob_identityType"
            :localData="dict.ZJLX"
            label="证件类型"
            placeholder="请选择证件类型"
          />
          <van-field
            label="证件号"
            v-model="form.ob.ob_IdNum"
            placeholder="请填写证件号"
          />
          <van-field
            label="通讯地址"
            v-model="form.ob.ob_address"
            placeholder="请填写通讯地址"
          />
          <van-field
            label="邮编"
            v-model="form.ob.ob_zipCode"
            placeholder="请填写邮编"
          />
          <van-field
            label="法人/负责人"
            v-model="form.ob.ob_principalName"
            placeholder="请填写法定代表人或负责人"
          />
          <van-field
            label="联系电话"
            v-model="form.ob.ob_principalTel"
            placeholder="请填写联系电话"
          />
          <van-field
            label="代理人姓名"
            v-model="form.ob.ob_agentName"
            placeholder="请填写代理人姓名"
          />
          <van-field
            label="代理人电话"
            v-model="form.ob.ob_agentTel"
            placeholder="请填写代理人电话"
          />
          <van-field
            label="代理机构名称"
            v-model="form.ob.ob_agency"
            placeholder="请填写代理机构名称"
          />
        </van-cell-group>
      </div>
      <div v-show="active == 2">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="其他信息" titleClass="sub-title" />
          <van-field
            label="竣工时间"
            v-model="form.dataInfo.JunGongShiJian"
            placeholder="请填写竣工时间"
          />
          <RGPicker
            label="房款交付方式"
            :value.sync="form.dataInfo.FangKuanJiaoFuFangShi"
            :localData="dict.FangKuanJiaoFuFangShi"
            placeholder="请填写房款交付方式"
          />
          <van-field
            label="甲方交房日期"
            v-model="form.dataInfo.JiaFangJiaoFangRiQi"
            placeholder="请填写甲方交房日期"
          />
          <van-field
            label="自行办理日期"
            v-model="form.dataInfo.ZiXingBanLiRiQi"
            placeholder="请填写自行办理日期"
          />

          <RGPicker
            label="争议解决方式"
            :value.sync="form.dataInfo.ShuangFangZhengYiJieJueFangShi"
            :localData="dict.ShuangFangZhengYiJieJueFangShi"
            placeholder="请填写争议解决方式"
          />
          <van-field
            label="土地使用权人"
            v-model="form.dataInfo.TuDiShiYongQuanRen"
            placeholder="请填写土地使用权人"
          />
          <van-field
            label="建筑占地面积"
            v-model="form.dataInfo.JianZhuWuZhanDiMianJi"
            placeholder="请填写建筑占地面积"
          />
          <RGPicker
            label="土地权利类型"
            :value.sync="form.dataInfo.TuDiQuanLiLeiXing"
            :localData="dict.TuDiQuanLiLeiXing"
            placeholder="请填写土地权利类型"
          />
          <van-field
            label="土地使用面积"
            v-model="form.dataInfo.TuDiShiYongQuanMianJi"
            placeholder="请填写土地使用权面积"
          />
          <van-field
            label="使用期限"
            v-model="form.dataInfo.ShiYongQiXian"
            placeholder="请填写使用期限"
          />
          <RGPicker
            label="土地权利性质"
            :value.sync="form.dataInfo.TuDiQuanLiXingZhi"
            :localData="dict.TuDiQuanLiXingZhi"
            placeholder="请填写土地权利性质"
          />
          <van-field
            label="起始时间"
            v-model="form.dataInfo.QiShiShiJian"
            placeholder="请填写起始时间"
          />
          <van-field
            label="终止时间"
            v-model="form.dataInfo.ZhongZhiShiJian"
            placeholder="请填写终止时间"
          />
          <van-field
            label="独用土地面积"
            v-model="form.dataInfo.DuYongTuDiMianJi"
            placeholder="请填写独用土地面积"
          />
          <van-field
            label="土地用途"
            v-model="form.dataInfo.TuDiYongTu"
            placeholder="请填写土地用途"
          />
          <van-field
            label="分摊土地面积"
            v-model="form.dataInfo.FenTanTuDiMianJi"
            placeholder="请填写分摊土地面积"
          />
          <van-field
            label="权利性质"
            v-model="form.dataInfo.QuanLiXingZhi"
            placeholder="请填写权利性质"
          />
          <van-field
            label="评估金额"
            v-model="form.dataInfo.QuanLiQiTaZhuangKuang"
            placeholder="请填写评估金额"
          />
          <van-field
            label="权利其他状况"
            v-model="form.dataInfo.PingGuJinE"
            placeholder="请填写权利其他状况"
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
          <van-cell title="婚姻状况承诺书（买方）" titleClass="sub-title" />
          <van-field
            label="姓名"
            v-model="form.marriage.buy.name"
            placeholder="请填写姓名"
          />
          <RGPicker
            label="性别"
            :value.sync="form.marriage.buy.gender"
            :localData="[
              { text: '男', value: '男' },
              { text: '女', value: '女' },
            ]"
            placeholder="请填写性别"
          />
          <RGPicker
            label="证件名称"
            :value.sync="form.marriage.buy.credentialName"
            :localData="[
              { text: '身份证', value: '身份证' },
              { text: '军官证', value: '军官证' },
              { text: '护照', value: '护照' },
            ]"
            placeholder="请填写证件名称"
          />
          <van-field
            label="证件号码"
            v-model="form.marriage.buy.credentialNum"
            placeholder="请填写证件号码"
          />
          <van-field
            label="配偶姓名"
            v-model="form.marriage.gzs_buy.spouseName"
            placeholder="请填写配偶姓名"
          />
          <van-field
            label="配偶证件号"
            v-model="form.marriage.gzs_buy.spouseNum"
            placeholder="请填写配偶证件号"
          />
          <van-field
            label="子女"
            v-model="form.marriage.gzs_buy.childName1"
            placeholder="请填写子女"
          />
          <van-field
            label="子女证件号"
            v-model="form.marriage.gzs_buy.childNum1"
            placeholder="请填写子女证件号"
          />
          <van-field
            label="子女"
            v-model="form.marriage.gzs_buy.childName2"
            placeholder="请填写子女"
          />
          <van-field
            label="子女证件号"
            v-model="form.marriage.gzs_buy.childNum2"
            placeholder="请填写子女证件号"
          />
          <van-cell
            center
            title="个人购买家庭（成员范围包括购房人、配偶以及未成年子女，下同）唯一住房； "
          >
            <template #right-icon>
              <van-switch v-model="form.marriage.gzs_buy.option1" />
            </template>
          </van-cell>
          <van-cell center title="个人购买家庭第二套改善性住房">
            <template #right-icon>
              <van-switch v-model="form.marriage.gzs_buy.option2" />
            </template>
          </van-cell>
          <van-cell center title="个人购买家庭第二套以上住房">
            <template #right-icon>
              <van-switch v-model="form.marriage.gzs_buy.option3" />
            </template>
          </van-cell>
          <van-cell title="现居住地" titleClass="sub-title" />
          <van-field
            type="textarea"
            rows="3"
            autosize
            maxlength="50"
            show-word-limit
            v-model="form.marriage.gzs_buy.location"
            placeholder="请填写现居住地"
          />
          <van-cell title="无配偶情况" titleClass="sub-title" />
          <RGDataPicker
            label="是否离婚"
            :value.sync="form.marriage.buy.divorceTime"
          />
          <RGDataPicker
            label="是否丧偶"
            :value.sync="form.marriage.buy.dieTime"
          />
          <van-cell v-if="active == 3">
            <van-notice-bar
              color="#1989fa"
              background="#ecf9ff"
              left-icon="info-o"
              speed="40"
            >
              友情提示：根据交易的实际情况，请将个人最后的婚姻情况填写。
            </van-notice-bar>
          </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 8px">
          <van-cell title="婚姻状况承诺书（卖方）" titleClass="sub-title" />
          <van-field
            label="姓名"
            v-model="form.marriage.sell.name"
            placeholder="请填写姓名"
          />
          <RGPicker
            label="性别"
            :value.sync="form.marriage.sell.gender"
            :localData="[
              { text: '男', value: '男' },
              { text: '女', value: '女' },
            ]"
            placeholder="请填写性别"
          />
          <RGPicker
            label="证件名称"
            :value.sync="form.marriage.sell.credentialName"
            :localData="[
              { text: '身份证', value: '身份证' },
              { text: '军官证', value: '军官证' },
              { text: '护照', value: '护照' },
            ]"
            placeholder="请填写证件名称"
          />
          <van-field
            label="证件号码"
            v-model="form.marriage.sell.credentialNum"
            placeholder="请填写证件号码"
          />
          <van-field
            label="配偶姓名"
            v-model="form.marriage.gzs_buy.spouseName"
            placeholder="请填写配偶姓名"
          />
          <van-field
            label="配偶证件号"
            v-model="form.marriage.gzs_buy.spouseNum"
            placeholder="请填写配偶证件号"
          />
          <van-field
            label="子女"
            v-model="form.marriage.gzs_buy.childName1"
            placeholder="请填写子女"
          />
          <van-field
            label="子女证件号"
            v-model="form.marriage.gzs_buy.childNum1"
            placeholder="请填写子女证件号"
          />
          <van-field
            label="子女"
            v-model="form.marriage.gzs_buy.childName2"
            placeholder="请填写子女"
          />
          <van-field
            label="子女证件号"
            v-model="form.marriage.gzs_buy.childNum2"
            placeholder="请填写子女证件号"
          />

          <RGPicker
            label="售房条件"
            :value.sync="form.marriage.gzs_sell.option"
            :localData="[
              {
                text: '个人出售家庭唯一住房并且购房时间满 五年',
                value: true,
              },
              {
                text: '个人出售家庭非唯一住房或者购房时间不满五年',
                value: false,
              },
            ]"
            placeholder="请填写证件名称"
          />
          <van-cell v-if="active == 3">
            <van-notice-bar
              color="#1989fa"
              background="#ecf9ff"
              left-icon="info-o"
              speed="40"
            >
              友情提示：（成员范围包括购房人、配偶以及未成年子女。以上次购房缴纳契税，取得契税税票之日起算）
            </van-notice-bar>
          </van-cell>
          <van-cell title="现居住地" titleClass="sub-title" />
          <van-field
            type="textarea"
            rows="3"
            autosize
            maxlength="50"
            show-word-limit
            v-model="form.marriage.gzs_sell.location"
            placeholder="请填写现居住地"
          />
          <van-cell title="无配偶情况" titleClass="sub-title" />
          <RGDataPicker
            label="是否离婚"
            :value.sync="form.marriage.sell.divorceTime"
          />
          <RGDataPicker
            label="是否丧偶"
            :value.sync="form.marriage.sell.dieTime"
          />
          <van-cell v-if="active == 3">
            <van-notice-bar
              color="#1989fa"
              background="#ecf9ff"
              left-icon="info-o"
              speed="40"
            >
              友情提示：根据交易的实际情况，请将个人最后的婚姻情况填写。
            </van-notice-bar>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-show="active == 4">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="不动产登记询问笔录（买方）" titleClass="sub-title" />
          <van-cell title="询问人" />
          <van-field v-model="form.bilv.buyerName" placeholder="请填写询问人" />
          <van-cell title="申请登记事项是否为申请人真实意思表示？" />
          <RGPicker
            :value.sync="form.bilv.buyerMean"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
          />
          <van-cell title="申请登记的房地产是共有还是单独所有？" />
          <RGPicker
            :value.sync="form.bilv.buyerIsAlone"
            :localData="[
              { text: '共有', value: '共有' },
              { text: '单独所有', value: '单独所有' },
            ]"
            placeholder="请填写共有或单独所有"
          />
          <van-cell title="申请登记的房地产是按份共有，还是共同共有？" />
          <RGPicker
            :value.sync="form.bilv.buyerIsMutual"
            :localData="[
              { text: '按份共有', value: '按份共有' },
              { text: '共同共有', value: '共同共有' },
            ]"
            placeholder="共有情况下，请填写是按份共有或共同共有"
          />
          <van-cell title="申请登记的房地产共有份额情况？" />
          <van-field
            v-model="form.bilv.buyerCommunalShare"
            placeholder="按份共有下，请填写共有具体份额。共同共有人不填写"
          />
          <van-cell title="申请异议登记时，权利人是否不同意办理更正登记？" />
          <van-field
            v-model="form.bilv.buyerIsCorrect"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
          />
          <van-cell title="申请异议登记时，是否已知悉异议不当应承担的责任？" />
          <van-field
            v-model="form.bilv.buyerDuty"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
          />
          <van-cell title="是否需要快递邮寄证书?" />
          <RGPicker
            :value.sync="form.bilv.buyerEms"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
          />
          <van-cell title="其他需要询问的有关事项" />
          <van-field
            v-model="form.bilv.buyerOther"
            placeholder="其他需要询问的有关事项"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="不动产登记询问笔录（卖方）" titleClass="sub-title" />
          <van-cell title="询问人" />
          <van-field
            v-model="form.bilv.sellerName"
            placeholder="请填写询问人"
          />
          <van-cell title="申请登记事项是否为申请人真实意思表示？" />
          <RGPicker
            :value.sync="form.bilv.sellerMean"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
          />
          <van-cell title="申请登记的房地产是共有还是单独所有？" />
          <RGPicker
            :value.sync="form.bilv.sellerIsAlone"
            :localData="[
              { text: '共有', value: '共有' },
              { text: '单独所有', value: '单独所有' },
            ]"
            placeholder="请填写共有或单独所有"
          />
          <van-cell title="申请登记的房地产是按份共有，还是共同共有？" />
          <RGPicker
            :value.sync="form.bilv.sellerIsMutual"
            :localData="[
              { text: '按份共有', value: '按份共有' },
              { text: '共同共有', value: '共同共有' },
            ]"
            placeholder="共有情况下，请填写是按份共有或共同共有"
          />
          <van-cell title="申请登记的房地产共有份额情况？" />
          <van-field
            v-model="form.bilv.sellerCommunalShare"
            placeholder="按份共有下，请填写共有具体份额。共同共有人不填写"
          />
          <van-cell title="申请异议登记时，权利人是否不同意办理更正登记？" />
          <van-field
            v-model="form.bilv.sellerIsCorrect"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
          />
          <van-cell title="申请异议登记时，是否已知悉异议不当应承担的责任？" />
          <van-field
            v-model="form.bilv.sellerDuty"
            placeholder="申请异议登记时填写，申请其他登记不填写本栏"
          />
          <van-cell title="是否需要快递邮寄证书?" />
          <RGPicker
            :value.sync="form.bilv.sellerEms"
            :localData="[
              { text: '是', value: '是' },
              { text: '否', value: '否' },
            ]"
            placeholder="请填写是或否"
          />
          <van-cell title="其他需要询问的有关事项" />
          <van-field
            v-model="form.bilv.sellerOther"
            placeholder="其他需要询问的有关事项"
          />
        </van-cell-group>
      </div>
    </van-form>
    <div style="margin: 12px">
      <van-button round type="warning" block @click="back()" v-if="active">
        上一步
      </van-button>
      <van-button
        round
        type="info"
        block
        @click="toPath()"
        style="margin-top: 8px"
      >
        下一步
      </van-button>
    </div>
  </div>
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
