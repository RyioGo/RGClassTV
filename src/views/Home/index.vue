<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import getList from "@/static/data/list";
import userApi from "@/api/user";
import utils from "@/libs/utils";
import { arrItemType } from "@/types/home";

import RGHeader from "@/components/RGHeader/index.vue";
import Content from "@/components/Content/index.vue";
@Component({
  components: { RGHeader, Content },
})
export default class HomeView extends Vue {
  public arrList: Array<arrItemType> = [];
  public keywords = "";
  public isTab = "1";
  public show = false;

  @Watch("isTab", { immediate: true })
  private isTabWatch(n: string): void {
    this.getList(n);
  }
  @Watch("keywords")
  private keywordsWatch(): void {
    this.getList(this.isTab);
  }

  public toEval(): void {
    utils.toEval(this.storage.get("globalConfig").eval);
  }

  public toPath(item: arrItemType): void {
    if (item.declareUrl.length) {
      userApi.getToken(item.declareUrl);
    } else {
      this.$router.push({
        name: "select",
        query: {
          flowId: item.flowId,
          formId: item.formId,
        },
      });
    }
  }

  public open(): void {
    this.show = true;
  }

  //  serviceObj: 1,个人 0,法人
  public async getList(serviceObj: string): Promise<void> {
    this.$store.commit("loader/setOption", "加载数据清单...");
    const data = await getList();
    if (data && data.length) {
      setTimeout(() => {
        this.arrList = data.filter((item: arrItemType) => {
          return (
            item.serviceObj == serviceObj &&
            item.flowName.includes(this.keywords)
          );
        });
        this.$store.commit("loader/setOption", false);
      }, 500);
    }
  }

  private created() {
    userApi.getUserInfo();
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader />
    <div class="sticky">
      <van-cell-group inset>
        <van-search v-model="keywords" shape="round" placeholder="办事名称" />
        <van-tabs v-model="isTab">
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
      </van-cell-group>
    </div>
    <div class="main">
      <van-cell-group inset :border="false" class="work" v-if="arrList.length">
        <van-cell
          v-for="(item, index) in arrList"
          :key="index"
          class="item-work"
          :style="{
            backgroundColor: '#eee',
            backgroundImage: `url(${require(`@/static/img/bgi/${item.img}`)})`,
          }"
          clickable
          @click="toPath(item)"
        >
          <template #title>
            <div class="ov-2">{{ item.flowName }}</div>
          </template>
          <template #label>
            <van-row :gutter="12" class="label">
              <van-col span="6">
                <van-button type="info" size="small" @click.stop="open()">
                  办事须知
                </van-button>
              </van-col>
              <van-col span="6">
                <van-button type="info" size="small" @click.stop="toPath(item)">
                  我要办理
                </van-button>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-cell-group>
      <van-empty v-else />
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <Content />
    </van-popup>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    margin-top: 12px;
    min-height: calc(100vh - 358px);
    .work {
      background-color: transparent;
      .item-work {
        position: relative;
        margin-bottom: 12px;
        background-color: transparent;
        height: 120px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .label {
        position: absolute;
        width: 100%;
        bottom: 18px;
      }
    }
  }
}
</style>
