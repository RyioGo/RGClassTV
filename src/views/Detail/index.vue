<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { detailType } from "@/types/select";

import RGHeader from "@/components/RGHeader/index.vue";
@Component({
  components: { RGHeader },
})
export default class DetailView extends Vue {
  public detail: detailType = this.storage.get("detail");

  public toPath(): void {
    this.$router.push({
      name: "form",
    });
  }
}
</script>

<template>
  <div class="rg-body">
    <RGHeader :subTitle="`关于${detail.flowName}办理须知`" />
    <div class="main">
      <van-cell-group inset>
        <van-cell title="事项清单" :value="`${detail.itemArray.length}项`" />
        <van-cell
          v-for="(item, index) in detail.itemArray"
          :key="index"
          :title="index + 1 + '. ' + item.itemName"
          :label="`相关机构：${item.orgName}`"
          :border="false"
        />
      </van-cell-group>
      <van-cell-group inset style="margin-top: 12px">
        <van-cell title="办件材料" />
        <div v-for="(item, index) in detail.itemArray" :key="index">
          <van-cell
            v-for="(it, k) in item.resourceArray"
            :key="k"
            :label="`材料编码：${it.resourceCode}`"
            :border="false"
          >
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
          </van-cell>
        </div>
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
