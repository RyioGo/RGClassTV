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
export default class bdcdjslCom extends Vue {
  //  表单步骤
  public active = 0;
  //   表单字典
  public dict = formDict.bdczxdj;
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
      DengJiLeiXing: "",
      XGZH: "",
      RYXXList: [],
    },
  };

  public toPath() {
    if (this.active >= 1) {
      this.setData();
      this.$router.push({
        name: "submit",
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
    this.form.info.certificateCode = this.form.dataInfo.XGZH;
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

    this.storage.set("form", {
      ...this.form.info,
      ...this.form.ri,
      ...this.form.ob,
    });

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
        <van-step>补充材料</van-step>
      </van-steps>
      <div v-show="active == 0">
        <van-cell-group style="margin-top: 8px">
          <van-cell title="申请登记事由" titleClass="sub-title" />
          <RGPicker
            :value.sync="form.dataInfo.DengJiLeiXing"
            :localData="dict.DengJiLeiXing"
            placeholder="请选择登记类型"
            label="登记类型"
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
