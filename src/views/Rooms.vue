<template>
  <div>
    <header>
      <div class="room-bg bg-1" :style="{'background-image' : `url(${loopRoom[loopIndex]})`}"></div>
      <div class="header-content">
        <img src="@/assets/images/logo_white.svg" alt="White Space Hotel" />
        <div class="flex-rcc contactSec">
          <div class="IGFB flex-rcc">
            <img src="../assets/images/instagram-brands.svg" class="mediaIcon" />
            <img src="../assets/images/facebook-brands.svg" class="mediaIcon" />
          </div>
          <div class="middleLine"></div>
          <div class="contactBox">
            <div class="contactText">
              <img src="../assets/images/phone.svg" class="contactIcon" />
              <p>02-17264937</p>
            </div>
            <div class="contactText">
              <img src="../assets/images/envelope-solid.svg" class="contactIcon" />
              <p>whitespace@whitespace.com.tw</p>
            </div>
            <div class="contactText">
              <img src="../assets/images/home.svg" class="contactIcon" />
              <p>台北市羅斯福路十段30號</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <RoomCard :rooms="rooms" />
    </main>
  </div>
</template>

<script>
import RoomCard from "../components/RoomCard";

export default {
  components: {
    RoomCard
  },
  data() {
    return {
      rooms: [],
      loopRoom: [
        "https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"
      ],
      loopIndex: 0
    };
  },
  created() {
    this.$http
      .get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
        headers: {
          Authorization: process.env.VUE_APP_APITOKEN,
          accept: "application/json"
        }
      })
      .then(response => {
        this.rooms = response.data.items;
      });
  },
  mounted() {
    setInterval(() => {
      this.loopIndex >= (this.loopRoom.length -1) ? this.loopIndex = 0 : this.loopIndex++;
    }, 3500);
  }
};
</script>

<style lang="scss" scoped>
.room-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: all 0.6s ease-in-out;
}

header {
  position: relative;
  height: 100vh;
  .header-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .contactSec {
      padding: 5% 0 10% 0;
      .mediaIcon {
        width: 23px;
        height: 23px;
        margin: 5px;
      }
      .middleLine {
        width: 1.5px;
        height: 100px;
        background-color: #ffffff;
        margin: 0 25px;
      }
      .contactBox {
        color: #ffffff;
        line-height: 2.3;
        .contactText {
          display: flex;
          align-items: center;
          .contactIcon {
            width: 20px;
            height: 20px;
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>
