<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
//  for node_modules api
import { Component, Vue } from "vue-property-decorator";

//  for you api
import formDict from "./dict";
//  for you ts

//  for you components
import RGPicker from "@/components/RGPicker/index.vue";
@Component({
  components: { RGPicker },
})
export default class bdcjcdjCom extends Vue {
  //  表单步骤
  public active = 0;
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
  };

  public toPath() {
    if (this.active >= 2) {
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

    // this.storage.set("forms", [
    //   {
    //     path: "二手房转移登记及水电气联动过户",
    //     type: ".docx",
    //     form: {
    //       ...this.form.info,
    //       ...this.form.ri,
    //       ...this.form.ob,
    //     },
    //   },
    // ]);

    this.storage.set("dataInfo", this.form.dataInfo);
  }
}
</script>

<template>
  <div class="rg-form">
    <van-form class="rg-form-data">
      <van-steps :active="active" active-color="#38f">
        <van-step>基本信息</van-step>
        <van-step>申请人信息</van-step>
        <van-step>其他信息</van-step>
        <van-step>进行签章</van-step>
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
          <van-field
            label="争议解决方式"
            v-model="form.dataInfo.ShuangFangZhengYiJieJueFangShi"
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
