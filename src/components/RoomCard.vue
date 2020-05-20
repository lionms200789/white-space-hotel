<template>
  <div class="rooms">
    <ul class="card-container flex-rcc">
      <li class="card-item" v-for="room in rooms" :key="room.id">
        <a href="javascript:;" class="card-link" @click.prevent="checkRoomDetail(room.id)">
          <img :src="room.imageUrl" class="room-img" />
          <div class="room-info flex-ccl">
            <div class="room-name">
              <p>{{ room.name }}</p>
            </div>
            <div class="room-price flex-rsbc">
              <p>
                NT.{{ room.normalDayPrice }}
                <span>平日</span>
              </p>
              <span>NT.{{ room.holidayPrice }} 假日</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["rooms"],
  methods: {
    checkRoomDetail(id) {
      this.$router.push(`roominfo/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.rooms {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -100px;
  margin-bottom:50px;
}

.card-container {
  flex-wrap: wrap;
  .card-item {
    width: 300px;
    height: 350px;
    margin: 0 10px 20px;
    box-shadow: 2px 2px 9px 0 rgba(0, 0, 0, 0.18);
    background: #f7f7f7;
    overflow: hidden;
    .card-link {
      display: block;
      height: 100%;
      position: relative;
      text-decoration: none;
      &:hover > .room-info {
        transform: translateY(0);
      }
      .room-img {
        width: 100%;
        height: 100%;
      }
    }
    .room-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 1rem;
      background: #f7f7f7;
      color: #000000;
      letter-spacing: 1.46px;
      line-height: 1.5;
      height: 100px;
      transform: translateY(50%);
      transition: all 0.3s ease-in-out;
      span {
        font-size: 12px;
        color: #6d7278;
      }
      .room-name {
        padding-bottom: 1.5rem;
      }
      .room-price {
        width: 100%;
        p {
          font-size: 18px;
        }
      }
    }
  }
}
</style>