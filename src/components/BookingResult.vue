<template>
  <div class="result-modal flex-csbl" v-if="showResultModal">
    <span class="result-title">{{ status }}</span>
    <loading
      :active.sync="this.status === '預約中'"
      :is-full-page="false"
      :width="35"
      :background-color="'transparent'"
      loader="dots"
    ></loading>
    <img src="../assets/images/info_icon/success.svg" class="result-icon" v-if="status === '預約成功'" />
    <i class="fa fa-times-circle fa-3x result-icon" v-if="status === '預約失敗'"></i>
    <router-link class="result-btn" :class="{ 'disabled' : this.status === '預約中' }" :to="'/'">回首頁</router-link>
  </div>
</template>

<script>
export default {
  props: ["status"],
  data() {
    return {
      showResultModal: false
    };
  },
  created() {
    this.$bus.$on("popUpResultModal", () => {
      this.showResultModal = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.result-modal {
  width: 100%;
  max-width: 350px;
  height: 200px;
  background: #fff;
  position: fixed;
  z-index: 30;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  .result-title {
    font-size: 24px;
    display: block;
  }
  .result-icon {
    width: 35px;
    height: 35px;
    display: block;
    align-self: center;
  }
  .result-btn {
    padding: 10px 12px;
    border: none;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    background-color: #484848;
    color: #fff;
    align-self: flex-end;
  }
  .disabled {
    background-color: rgba(72, 72, 72, 0.7);
    pointer-events: none;
  }
}
</style>