<template>
  <div id="app">
    <router-view />
    <RGLoader
      :show="$store.state.loader.show"
      :desc="$store.state.loader.message"
    />
  </div>
</template>

<style lang="less">
#app {
  position: relative;
}
</style>
