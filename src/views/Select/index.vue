<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gftApi from "@/api/main";
import userApi from "@/api/user";

import apiData from "@/static/data/apiData";

import {
  selectDataType,
  selectDataItemType,
  itemsType,
  itemArrayType,
  resourceArrayType,
} from "@/types/select";

import RGHeader from "@/components/RGHeader/index.vue";
@Component({
  components: { RGHeader },
})
export default class SelectView extends Vue {
  public selectData: selectDataType<selectDataItemType<itemsType>> = {
    flowName: "",
    serviceObj: "",
    isOneForm: "",
    data: [],
    formId: "",
  };
  public isOpen: Array<string> = [];

  public boxs: any = {};

  public allSelectStatus = false;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public setBoxs(el: any, mode: string, index: number, key: number): void {
    if (el) {
      this.boxs[`${index}-${key}&${mode}`] = el;
    }
  }

  public toggleBox(mode: string, index: number, key: number): void {
    this.boxs[`${index}-${key}&${mode}`].toggle();
  }

  public allSelect(): void {
    this.allSelectStatus = !this.allSelectStatus;
    // 多选状态下的控制
    Object.keys(this.boxs).forEach((item: string) => {
      if (item.includes("&1")) {
        this.boxs[item].toggle(this.allSelectStatus);
      }
    });
    //  单选状态下的控制
    this.selectData.data = this.selectData.data.map(
      (item: selectDataItemType<itemsType>) => {
        if (item.statusMode == "0" && item.select?.length == 0) {
          if (this.allSelectStatus) {
            item.select = item.items[0].itemId;
          } else {
            item.select = "";
          }
        }
        return item;
      }
    );
  }

  public async toPath(): Promise<void> {
    try {
      let selectItem: Array<string> = [];
      //  对事项清单进行收集整理
      this.selectData.data.forEach((item: selectDataItemType<itemsType>) => {
        //  抛出未进行必选操作的提醒
        if (item.must == "1" && item.select?.length == 0) {
          throw new Error(`${item.statusName}包含必须办理事项！`);
        }
        //  汇总选中的事项清单且跳过未选的业务
        if (item.select?.length) {
          item.statusMode == "0"
            ? selectItem.push(item.select as string)
            : (selectItem = selectItem.concat(item.select));
        }
      });
      //  办理流程中，未选中任意一项待办事项，抛出提示信息
      if (selectItem.length == 0) {
        throw new Error(`请选择待办理事项！`);
      }

      let interface_id: string = this.storage.get("globalConfig").apis.bjxz;

      this.$store.commit("loader/setOption", "生成办件须知...");
      const res = await gftApi.getGate(interface_id, {
        flowId: this.$route.query.flowId,
        selectItem: selectItem.toString(),
      });
      if (res && res.code == 200) {
        res.data = JSON.parse(res.data);
        //  向材料清单中注入上传文件的数据变量
        res.data.info.itemArray = res.data.info.itemArray.map(
          (item: itemArrayType) => {
            item.resourceArray.forEach((it: resourceArrayType) => {
              it.uploadFile = [];
            });
            return item;
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const moreData: any = apiData[process.env.VUE_APP_CITY];
        if (moreData && moreData[this.$route.query.flowId as string]) {
          res.data.info.itemArray = res.data.info.itemArray.concat(
            moreData[this.$route.query.flowId as string].detail
          );
        }
        this.storage.set("detail", res.data.info);
        this.storage.set("selectItem", selectItem);
        this.$store.commit("loader/setOption", false);
        this.$router.push({ name: "detail" });
      }
    } catch (error: any) {
      this.$notify({ type: "warning", message: error.message });
    }
  }

  private async getStatusItemGroups() {
    let interface_id: string = this.storage.get("globalConfig").apis.bjxx;

    this.$store.commit("loader/setOption", "加载申报内容...");
    const res = await gftApi.getGate(interface_id, {
      flowId: this.$route.query.flowId,
    });
    if (res && res.code == 200) {
      res.data = JSON.parse(res.data);
      //  存储需要的字段并设置临时缓存
      this.selectData = {
        formId: this.$route.query.formId || "default",
        flowName: res.data.flowName,
        serviceObj: res.data.serviceObj,
        isOneForm: res.data.isOneForm,
        data: res.data.info.map((item: selectDataItemType<itemsType>) => {
          // 按事项选择方式初始化备选事项清单类型
          item.select = item.statusMode == "0" ? "" : [];
          // 配置默认展开的折叠面板
          this.isOpen.push(item.statusName);
          // 返回本次配置
          return item;
        }),
      };
      this.storage.set("evalCode", "  " + this.selectData.flowName);
      this.storage.set("selectData", this.selectData);
      this.$store.commit("loader/setOption", false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const moreData: any = apiData[process.env.VUE_APP_CITY];
      if (moreData && moreData[this.$route.query.flowId as string]) {
        this.selectData.data = moreData[
          this.$route.query.flowId as string
        ].select.map((item: selectDataItemType<itemsType>) => {
          // 按事项选择方式初始化备选事项清单类型
          item.select = item.statusMode == "0" ? "" : [];
          // 配置默认展开的折叠面板
          this.isOpen.push(item.statusName);
          // 返回本次配置
          return item;
        });
        this.$nextTick(() => {
          this.allSelect();
        });
      }
    } else {
      this.$notify({ type: "warning", message: res.msg });
    }
  }

  private created() {
    userApi.getUserInfo();
    this.getStatusItemGroups();
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader :subTitle="`关于${selectData.flowName}办理清单`" />
    <div class="main">
      <van-cell-group inset :border="false">
        <van-cell title="全选" clickable @click="allSelect()">
          <template #right-icon>
            <van-checkbox v-model="allSelectStatus" />
          </template>
        </van-cell>
        <van-notice-bar
          color="#888"
          background="#fff"
          left-icon="info-o"
          style="font-size: 12px"
        >
          单选业务，如未选择办件事项则会默认选择首项。
        </van-notice-bar>
      </van-cell-group>
      <van-cell-group inset :border="false" style="margin-top: 12px">
        <van-collapse v-model="isOpen" v-if="selectData.data.length">
          <van-collapse-item
            v-for="(item, index) in selectData.data"
            :key="index"
            :name="item.statusName"
          >
            <template #title>
              <div>
                <van-tag type="primary" plain style="margin-right: 3px">
                  {{ item.statusMode == "0" ? "单选" : "多选" }}
                </van-tag>
                <van-tag
                  v-show="item.must == '1'"
                  type="danger"
                  plain
                  style="margin-right: 3px"
                >
                  必选
                </van-tag>
                {{ item.statusName }}
              </div>
            </template>
            <!-- 单选 -->
            <van-radio-group
              v-model="item.select"
              v-if="item.statusMode == '0'"
            >
              <van-cell-group :border="false">
                <van-cell
                  v-for="(it, k) in item.items"
                  clickable
                  :key="k"
                  :title="k + 1 + ' .' + it.itemName"
                  :label="`相关机构：${it.orgName}`"
                  @click="toggleBox(item.statusMode, index, k)"
                >
                  <template #right-icon>
                    <!-- 单选 -->
                    <van-radio
                      :name="it.itemId"
                      :ref="
                        (el) => {
                          setBoxs(el, item.statusMode, index, k);
                        }
                      "
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
            <!-- 多选 -->
            <van-checkbox-group
              v-model="item.select"
              v-if="item.statusMode == '1'"
            >
              <van-cell-group :border="false">
                <van-cell
                  v-for="(it, k) in item.items"
                  clickable
                  :key="k"
                  :title="k + 1 + ' .' + it.itemName"
                  :label="`相关机构：${it.orgName}`"
                  @click="toggleBox(item.statusMode, index, k)"
                >
                  <template #right-icon>
                    <!-- 多选 -->
                    <van-checkbox
                      :name="it.itemId"
                      :ref="
                        (el) => {
                          setBoxs(el, item.statusMode, index, k);
                        }
                      "
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </van-collapse-item>
        </van-collapse>
        <van-empty v-else />
      </van-cell-group>
      <van-cell-group inset :border="false" style="margin-top: 12px">
        <van-button type="info" block @click="toPath()">下一步</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped lang="less">
.rg-body {
  position: relative;
  .main {
    padding: 12px 0;
    min-height: calc(100vh - 236px);
  }
}
</style>
