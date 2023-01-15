<script lang="ts">
//  for node_modules api
import { Component, Vue } from "vue-property-decorator";

//  for you api

//  for you ts

//  for you components

@Component({
  components: {},
})
export default class RGIframe extends Vue {
  private created() {
    console.log("page created");
  }
}
</script>

<template>
  <iframe
    src="https://ca.xysstgs.com:8899/local-sign/middle?accountId=37865c907f914880af800abb00861afd&flowUuid=e9c2df9628d8480a8f6fc4a827177bf4"
    class="rg-iframe"
  ></iframe>
</template>

<style scoped lang="less">
.rg-iframe {
  display: grid;
  width: 100%;
  height: 90vh;
}
</style>
