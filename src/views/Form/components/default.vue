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
  public dict = formDict;
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
      TongYongQiYe: "",
      TongYongXiangMu: "",
    },
  };

  public toPath() {
    if (this.active >= 0) {
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
    this.storage.set("dataInfo", this.form.dataInfo);
    //this.storage.set("filePath", "/data/不动产抵押注销登记.docx");
  }
}
</script>

<template>
  <div class="rg-form">
    <van-form class="rg-form-data">
      <van-steps :active="active" active-color="#38f">
        <van-step>基本信息</van-step>
        <van-step>补充材料</van-step>
      </van-steps>
      <div>
        <van-cell-group style="margin-top: 8px">
          <van-cell title="项目" titleClass="sub-title" />
          <van-field
            type="textarea"
            rows="7"
            autosize
            maxlength="120"
            show-word-limit
            v-model="form.dataInfo.TongYongQiYe"
            placeholder="请填写项目"
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
            v-model="form.dataInfo.TongYongXiangMu"
            placeholder="请填写备注"
          />
        </van-cell-group>
      </div>
    </van-form>
    <div style="margin: 12px">
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
