<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "./assets/scss/all";
#app {
  width: 100%;
  height: 100%;
  font-family: NotoSansCJKtc-DemiLight,-apple-system, Microsoft JhengHei,BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  font-size: 16px;
}
</style>