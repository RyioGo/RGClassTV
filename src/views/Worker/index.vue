<script lang="ts">
//  for node_modules api
import { Component, Watch, Vue } from "vue-property-decorator";

//  for you api
import gftApi from "@/api/main";
import { UserModule } from "@/store/module/user";
//  for you ts
import { recordsItemType } from "@/types/worker";
//  for you components
import RGHeader from "@/components/RGHeader/index.vue";

@Component({
  components: { RGHeader },
})
export default class WorkerView extends Vue {
  public user = UserModule;

  //  用户办件记录列表
  public officeRecords: Array<recordsItemType> = [];
  //  用户办件接口加载状态
  public loading = false;
  //  用户办件记录是否全部加载完毕
  public finished = false;
  //  办件记录页码数据
  public pages = {
    page: 1,
    rows: 10,
    total: 0,
  };
  //  个人记录与法人记录key
  public serviceObj = "1";
  //  用户是否包含相关企业
  public eToken = this.storage.get("eToken");

  @Watch("serviceObj", { immediate: true })
  private serviceObjWatch(): void {
    this.officeRecords = [];
    this.userRecords();
  }

  //  触发首页，下一页加载，加载相关状态更新
  public async userRecords(): Promise<void> {
    let interface_id: string = this.storage.get("globalConfig").apis.bjjl;
    this.$store.commit("loader/setOption", "查询办件记录...");
    const res = await gftApi.getGate(interface_id, {
      serviceObj: this.serviceObj,
      number: UserModule.userInfo.idCard,
      page: this.pages.page,
      rows: this.pages.rows,
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      if (res.data.state == 200) {
        res.data.info.rows.forEach((item: recordsItemType) => {
          item = this.getStatus(item);
          this.officeRecords.push(item);
        });
        this.pages.total = res.data.info.total;
      } else {
        this.$notify({ type: "warning", message: res.data.error });
      }
    } else {
      this.$notify({ type: "warning", message: res.msg });
    }
    this.$store.commit("loader/setOption", false);
    // 加载状态结束
    this.loading = false;
    // 数据全部加载完成
    if (this.officeRecords.length >= this.pages.total) {
      this.finished = true;
    }
  }
  //  生成事项中 办件状态的相关数据并返回
  public getStatus(item: recordsItemType): recordsItemType {
    switch (item.STATUS) {
      case "05":
        item.labelStatus = "不予受理";
        item.tagColor = "danger";
        break;
      case "11":
        item.labelStatus = "受理中";
        item.tagColor = "primary";
        break;
      case "99":
        item.labelStatus = "已办结";
        item.tagColor = "success";
        break;
      default:
        item.labelStatus = "待预审";
        item.tagColor = "warning";
    }
    return item;
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader :subTitle="`${user.userInfo.name}的办件清单`" />
    <div class="main">
      <div class="sticky ml-16 mr-16">
        <van-tabs v-model="serviceObj">
          <van-tab name="1">
            <template #title>
              <van-icon name="user-o" style="margin-right: 3px" />个人办事
            </template>
          </van-tab>
          <van-tab name="0">
            <template #title>
              <van-icon name="hotel-o" style="margin-right: 3px" />法人办事
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <template v-if="officeRecords.length">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="userRecords"
        >
          <van-cell-group
            inset
            v-for="(item, key) in officeRecords"
            :key="key"
            class="mt-12"
          >
            <van-cell :title="item.APPLY_SUBJECT" />
            <van-cell
              title="流水号"
              :value="item.RECEIVE_ID"
              value-class="value-cell"
            />
            <van-cell
              title="申报时间"
              :value="item.APPLY_TIME"
              value-class="value-cell"
            />
            <van-cell title="办件状态" value-class="value-cell">
              <template #default>
                <van-tag :type="item.tagColor" size="medium">
                  {{ item.labelStatus }}
                </van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </van-list>
      </template>
      <template v-else>
        <van-empty description="未查询到相关办件" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    padding: 12px 0;
    min-height: calc(100vh - 236px);
    .value-cell {
      flex: 3;
    }
  }
}
</style>
