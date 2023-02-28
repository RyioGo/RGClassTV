<!-- eslint-disable @typescript-eslint/explicit-module-boundary-types -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import RGPicker from "@/components/RGPicker/index.vue";
import formDict from "./dict";
@Component({
  components: {
    RGPicker,
  },
})
export default class bdcdydjCom extends Vue {
  //  表单步骤
  public active = 0;
  //   表单字典
  public dict = formDict.bdcdydj;
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
      RYXXList: [],
      XGZH: "",
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
    },
  };

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
    this.form.info.claimAccount = this.form.dataInfo.BDBZhuZhaiQuanSE;
    this.form.info.certificateCode = this.form.dataInfo.XGZH;
    this.form.info.performanceTerm = this.form.dataInfo.DYQiXian;
    this.form.info.buildingsRange = this.form.dataInfo.ZJJZWDiYaFanWei;
    this.form.info.remarks = this.form.dataInfo.FuJi;

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
    this.form.bilv.buyerTime = moment().format("YYYY年MM月DD");

    this.storage.set("forms", [
      {
        path: "不动产抵押登记",
        type: ".docx",
        form: {
          ...this.form.info,
          ...this.form.ri,
          ...this.form.ob,
        },
      },
      {
        path: "不动产询问笔录",
        type: ".docx",
        form: this.form.bilv,
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
        <van-step>基本信息</van-step>
        <van-step>申请人信息</van-step>
        <van-step>不动产</van-step>
        <van-step>询问笔录</van-step>
        <van-step>签章</van-step>
      </van-steps>
      <div v-show="active == 0">
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
            label="不动产价值"
            v-model="form.dataInfo.BDChJZ"
            placeholder="请填写不动产价值"
          />
        </van-cell-group>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="抵押情况" titleClass="sub-title" />
          <van-field
            label="被担保债权额"
            v-model="form.dataInfo.BDBZhuZhaiQuanSE"
            placeholder="请填写被担保债权数额（最高债权数额）"
          />
          <van-field
            label="在建抵押范围"
            v-model="form.dataInfo.ZJJZWDiYaFanWei"
            placeholder="请填写在建建筑物抵押范围"
          />
          <van-field
            label="债务履行期限"
            v-model="form.dataInfo.DYQiXian"
            placeholder="请填写债务履行期限（债权确定期间）"
          />
          <van-field
            label="起始日期"
            v-model="form.dataInfo.QiShiRiQi"
            placeholder="请填写起始日期"
          />
          <van-field
            label="终止日期"
            v-model="form.dataInfo.ZhongZhiRiQi"
            placeholder="请填写终止日期"
          />
          <RGPicker
            :value.sync="form.dataInfo.ShiFuCunZaiJinZhi"
            :localData="dict.ShiFuCunZaiJinZhi"
            placeholder="请选择抵押受限"
            label="抵押受限"
          />
          <van-field
            label="抵押顺位"
            v-model="form.dataInfo.DiYaShunWei"
            placeholder="请填写抵押顺位"
          />
          <van-field
            label="抵押担保范围"
            v-model="form.dataInfo.DiYaDanBaoFanWei"
            placeholder="请填写抵押担保范围"
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
            label="最高债券确定事实"
            v-model="form.dataInfo.ZuiGaoZhaiQuanQueDingShiShi"
            placeholder="请填写最高债券确定事实"
          />
          <van-field
            label="其他权利状况"
            v-model="form.dataInfo.QiTaQuanLiZK"
            placeholder="请填写其他权利状况"
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
        <van-cell-group>
          <van-cell title="不动产登记询问笔录" titleClass="sub-title" />
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
    min-height: calc(100vh - 180px);
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
