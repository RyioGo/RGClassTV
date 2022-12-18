<template>
  <div id="app">
    <router-view />
    <RGFooter />
    <RGLoader
      :show="$store.state.loader.show"
      :desc="$store.state.loader.message"
    />
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  position: relative;
  background-color: #f7f8fa;
}
.sticky {
  margin-top: 12px;
  position: sticky;
  z-index: 4;
  top: 12px;
}
</style>
