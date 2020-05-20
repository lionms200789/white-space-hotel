<template>
  <transition name="fade">
    <div id="lightbox" class="flex-rsac" v-if="control" @click.self="closeLightBox">
      <i class="fa fa-3x fa-chevron-left arrow" @click="indexControl(-1)"></i>
      <div class="lightbox-view flex-rcc">
        <img
          :src="roomsImg[i]"
          v-for="(img,i) in roomsImg.length"
          :key="i"
          class="lightbox-img"
          :class="{'active': index === i}"
        />
      </div>
      <i class="fa fa-3x fa-chevron-right arrow" @click="indexControl(+1)"></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["roomsImg", "control"],
  data() {
    return {
      index: 0
    };
  },
  methods: {
    indexControl(num) {
      this.index += num;
      if (this.index > this.roomsImg.length - 1) {
        this.index = 0;
      } else if (this.index < 0) {
        this.index = this.roomsImg.length - 1;
      }
    },
    closeLightBox() {
      this.$emit("lightboxControl");
    }
  }
};
</script>

<style lang="scss">
#lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  .lightbox-view {
    width: 70vh;
    position: relative;
    .lightbox-img {
      width: 100%;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
      position: absolute;
      opacity: 0;
      transform: translateX(45px);
      &.active {
        opacity: 1;
        transform: translateX(0px);
        transition: all 0.7s ease-in-out;
      }
    }
  }
  .arrow {
    color: #fff;
    display: block;
    cursor: pointer;
    padding: 10px;
    z-index: 100;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>