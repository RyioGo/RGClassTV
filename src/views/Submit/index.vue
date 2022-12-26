<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import gftApi from "@/api/main";

import { UserModule } from "@/store/module/user";

import { orgType } from "@/types/submit";
import { itemArrayType, resourceArrayType } from "@/types/select";

import RGPicker from "@/components/RGPicker/index.vue";
import RGUpload from "@/components/RGUpload/index.vue";
@Component({
  components: {
    RGPicker,
    RGUpload,
  },
})
export default class SubmitView extends Vue {
  public user = UserModule;
  public formData = {
    flowId: this.storage.get("detail").flowId,
    selectItem: this.storage.get("selectItem"),
    serviceObj: this.storage.get("detail").serviceObj,
    applyObj: {},
    material: [],
    dataInfo: this.storage.get("form"),
  };
  public per = {
    name: UserModule.userInfo.name,
    sex: UserModule.userInfo.sex == "1" ? "男" : "女",
    address: "",
    certNo: UserModule.userInfo.idCard,
    certType: "DZZZ_CERTIFTYPE",
    phone: UserModule.userInfo.phone,
    isAgent: "",
  };
  public enr = {
    orgName: "",
    orgType: "",
    orgCode: "",
    legalPerson: "",
    certificateNo: "",
    contactPhone: "",
    linkEmail: "",
    linkAddress: "",
    linkMan: UserModule.userInfo.name,
    linkTelephone: UserModule.userInfo.phone,
    linkMancertificateName: "DZZZ_CERTIFTYPE",
    certificateName: "DZZZ_CERTIFTYPE",
    linkMancertificateNo: UserModule.userInfo.idCard,
  };
  public dataModel = this.storage.get("detail").itemArray;
  public orgList: Array<orgType> = [];
  public dictOrgType = [
    {
      text: "有限责任公司(国有独资)",
      id: "1110",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(外商投资企业合资)",
      id: "1121",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(外商投资企业与内资合资)",
      id: "1122",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(外商投资企业法人独资)",
      id: "1123",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(自然人投资或控股)",
      id: "1130",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(国有控股)",
      id: "1140",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司(自然人独资)",
      id: "1151",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司（自然人投资或控股的法人独资）",
      id: "1152",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "有限责任公司（非自然人投资或控股的法人独资）",
      id: "1153",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(上市、外商投资企业投资)",
      id: "1211",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(上市、自然人投资或控股)",
      id: "1212",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(上市、国有控股)",
      id: "1213",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(非上市、外商投资企业投资)",
      id: "1221",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(非上市、自然人投资或控股)",
      id: "1222",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
    {
      text: "股份有限公司(非上市、国有控股)",
      id: "1223",
      desc: "",
      type: "企业类型",
      value: "QYSL_ORGTYPE",
    },
  ];
  public showAction = false;
  public pageindex = 1;
  public pagenum = 3;
  public total = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fileSetParams(item: itemArrayType, it: resourceArrayType): any {
    return {
      resourceCode: it.resourceCode,
      resourceType: it.resourceType,
      itemId: item.itemId,
      itemCode: item.itemCode,
      fileName: it.resourceName + ".png",
      filePath: "",
      fileType: "1",
    };
  }

  public onSelect(item: orgType): void {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    if (item.name == "更多企业") {
      this.pagenum += 3;
      this.getEntInfo();
    } else {
      this.enr.orgName = item.corname;
      this.enr.orgCode = item.cornumber;
      this.enr.legalPerson = item.corusername;
      this.enr.certificateNo = item.corusercardid;
      this.showAction = false;
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      let material: any = [];

      this.dataModel.forEach((item: itemArrayType) => {
        item.resourceArray.forEach((it: resourceArrayType) => {
          //  移除所有提交未通过的材料
          let uploadFile: any = [];
          it.uploadFile?.forEach((file) => {
            if (file.status == "done") uploadFile.push(file);
          });
          it.uploadFile = uploadFile;
          //  检验是否有漏填的数据
          if (it.must == "1" && it.uploadFile?.length == 0) {
            throw new Error(`请补全: ${it.resourceName}材料。 `);
          }
          //  将提交的数据并入材料清单
          material = material.concat(
            it.uploadFile?.map((file) => {
              return file.data;
            })
          );
        });
      });
      //  格式化选中事项
      this.formData.selectItem = this.formData.selectItem.map(
        (item: string) => {
          return {
            itemId: item,
          };
        }
      );
      //  插入证明材料数据
      this.formData.material = material;
      //  插入办件人员数据
      this.formData.applyObj =
        this.formData.serviceObj == "1" ? this.per : this.enr;

      //  开始申报
      let interface_id: string = this.storage.get("globalConfig").apis.ywsb;
      this.$store.commit("loader/setOption", "发送提交数据...");
      const res = await gftApi.getGate(interface_id, this.formData);
      if (res && res.code == 200 && JSON.parse(res.data).state == 200) {
        this.$store.commit("loader/setOption", "提交完成，即将返回首页！");
        this.$notify({
          type: "success",
          message: "提交成功，请耐心等待审批通知！",
          onClose: () => {
            this.$store.commit("loader/setOption", false);
            window.location.replace(this.storage.get("href"));
          },
        });
      } else {
        this.$store.commit("loader/setOption", false);
        this.$notify({
          type: "warning",
          message: JSON.parse(res.data).error,
        });
      }
    } catch (error: any) {
      this.$notify({
        type: "warning",
        message: error.message || "证明材料未补全！",
      });
    }
  }

  public async getEntInfo(): Promise<void> {
    this.$store.commit("loader/setOption", "加载企业清单列表...");
    let interface_id: string = this.storage.get("globalConfig").apis.qyqd;
    const res = await gftApi.getGate(interface_id, {
      params: {
        token: UserModule.userInfo.token,
        pageindex: this.pageindex + "",
        pagenum: this.pagenum + "",
      },
      servicename: "findCorporationByToken",
    });
    if (res && res.code == 200 && JSON.parse(res.data).state == 200) {
      res.data = JSON.parse(res.data);
      this.orgList = JSON.parse(res.data.data.list).map((item: orgType) => {
        return { name: item.corname, subname: item.cornumber, ...item };
      });
      if (this.pagenum < res.data.data.count) {
        this.orgList.push({
          name: "更多企业",
          subname: "",
          corname: "",
          cornumber: "",
          corporationid: "",
          corrole: "",
          cortype: "",
          corusercardid: "",
          corusername: "",
          pgname: "",
        });
      }
      this.total = res.data.data.count;
    } else {
      this.$store.commit("loader/setOption", false);
      this.$notify({
        type: "warning",
        message: JSON.parse(res.data).message,
      });
    }
  }

  private created() {
    if (this.storage.get("detail").serviceObj == 0) {
      this.getEntInfo();
    }
  }
}
</script>

<template>
  <div class="rg-body">
    <div class="main">
      <van-form @submit="onSubmit">
        <!-- 个人基本信息 -->
        <van-cell-group inset v-if="formData.serviceObj == 1">
          <van-cell title="申报个人信息" />
          <van-field :value="user.forName" readonly label="姓名" />
          <van-field :value="user.forSex" readonly label="性别" />
          <van-field
            value="中华人民共和国居民身份证"
            readonly
            label="证件类型"
          />
          <van-field :value="user.forIdCard" readonly label="证件编号" />
          <van-field :value="user.forPhone" readonly label="联系电话" />
          <van-field
            v-model="per.address"
            rows="1"
            autosize
            label="联系地址"
            type="textarea"
            placeholder="请填写申报人员联系地址"
          />
        </van-cell-group>
        <!-- 企业基本信息 -->
        <van-cell-group inset v-if="formData.serviceObj == 0">
          <van-cell title="申报法人信息" />
          <van-field
            v-model="enr.orgName"
            readonly
            label="机构名称"
            placeholder="请选择机构名称"
            @click="showAction = true"
            :rules="[{ required: true, message: '请选择机构名称' }]"
          />
          <van-field
            v-model="enr.orgCode"
            label="机构编码"
            placeholder="请填写机构编码"
            :rules="[{ required: true, message: '请填写机构编码' }]"
          />
          <RGPicker
            :value.sync="enr.orgType"
            :localData="dictOrgType"
            label="机构类型"
            placeholder="请选择机构类型"
            :rules="[{ required: true, message: '请选择机构类型' }]"
          />
          <van-field
            v-model="enr.legalPerson"
            label="法人姓名"
            placeholder="请填写法人姓名"
            :rules="[{ required: true, message: '请填写法人姓名' }]"
          />
          <van-field
            v-model="enr.contactPhone"
            label="法人电话"
            placeholder="请填写法人电话"
            :rules="[{ required: true, message: '请填写法人电话' }]"
          />
          <van-field
            value="中华人民共和国居民身份证"
            readonly
            label="法人证件类型"
          />
          <van-field
            v-model="enr.certificateNo"
            label="法人证件编号"
            placeholder="请填写法人证件编号"
            :rules="[{ required: true, message: '请填写法人证件编号' }]"
          />
          <van-field
            :value="user.forName"
            readonly
            label="姓名"
            placeholder="请填写申报人员姓名"
          />
          <van-field
            value="中华人民共和国居民身份证"
            readonly
            label="证件类型"
          />
          <van-field
            :value="user.forIdCard"
            readonly
            label="证件编号"
            placeholder="请填写证件编号"
          />
          <van-field
            :value="user.forPhone"
            readonly
            label="联系电话"
            placeholder="请填写联系电话"
          />
          <van-field
            v-model="enr.linkEmail"
            label="联系邮箱"
            placeholder="请填写联系邮箱"
          />
          <van-field
            v-model="enr.linkAddress"
            rows="1"
            autosize
            label="联系地址"
            type="textarea"
            placeholder="请填写申报人员联系地址"
          />
        </van-cell-group>
        <!-- 材料 -->
        <van-cell-group inset style="margin-top: 12px">
          <van-cell title="相关证明材料" />
          <div v-for="(item, index) in dataModel" :key="index">
            <van-cell v-for="(it, k) in item.resourceArray" :key="k">
              <template #title>
                <van-tag
                  v-show="it.must == '1'"
                  type="danger"
                  plain
                  style="margin-right: 3px"
                >
                  必填
                </van-tag>
                {{ it.resourceName }}
              </template>
              <template #label>
                <RGUpload
                  :value.sync="it.uploadFile"
                  :params="fileSetParams(item, it)"
                />
              </template>
            </van-cell>
          </div>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>

    <van-action-sheet
      safe-area-inset-bottom
      title="我的机构"
      v-model="showAction"
      :actions="orgList"
      @select="onSelect"
    />
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    padding: 12px 0;
    min-height: calc(100vh - 56px);
    overflow: scroll;
  }
}
</style>
