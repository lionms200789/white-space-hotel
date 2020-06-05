<template>
  <div>
    <LightBox
      :rooms-img="roomDetail.imageUrl"
      :control="switchLightBox"
      :index="index"
      @lightboxControl="lightBoxSwitch"
    />
    <div class="room-gallery" @click="switchLightBox = true">
      <router-link :to="'/'">
        <img src="../assets/images/logo_block.svg" class="logo-block" />
      </router-link>
      <div class="room-left" :style="{ 'background-image' : `url(${roomDetail.imageUrl[0]})` }"></div>
      <div class="room-right">
        <div :style="{'background-image' : `url(${roomDetail.imageUrl[1]})` }"></div>
        <div :style="{'background-image' : `url(${roomDetail.imageUrl[2]})` }"></div>
      </div>
    </div>

    <div class="room-container flex-rsbs">
      <div class="room-info">
        <h5 class="room-type">{{ roomDetail.name }}</h5>
        <p>房客人數限制: {{ roomDetail.descriptionShort.GuestMin }} ~ {{ roomDetail.descriptionShort.GuestMax }}人</p>
        <p v-if="roomDetail.descriptionShort.Bed">床型: {{ roomDetail.descriptionShort.Bed[0] }}</p>
        <p>衛浴數量: {{ roomDetail.descriptionShort['Private-Bath'] }}間</p>
        <p>房間大小: {{ roomDetail.descriptionShort.Footage }}平方公尺</p>
        <p class="description">{{ roomDetail.description }}</p>
        <div class="check-date flex-rsbc" v-if="roomDetail.checkInAndOut">
          <div class="check-in flex-ccl">
            <span>Check In</span>
            <span
              class="check-in-time"
            >{{ roomDetail.checkInAndOut.checkInEarly }} ~ {{ roomDetail.checkInAndOut.checkInLate }}</span>
          </div>
          <div class="check-out flex-ccl">
            <span>Check Out</span>
            <span class="check-out-time">{{ roomDetail.checkInAndOut.checkOut }}</span>
          </div>
        </div>
        <div class="room-amenities" v-if="roomDetail.amenities">
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Wi-Fi'] }">
            <img src="../assets/images/info_icon/wifi.svg" class="info-icon" />
            <span>Wi-Fi</span>
          </div>
          <div class="amenity">
            <img src="../assets/images/info_icon/phone.svg" class="info-icon" />
            <span>電話</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Great-View'] }">
            <img src="../assets/images/info_icon/mountain-range.svg" class="info-icon" />
            <span>漂亮的視野</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Breakfast'] }">
            <img src="../assets/images/info_icon/breakfast.svg" class="info-icon" />
            <span>早餐</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Air-Conditioner'] }">
            <img src="../assets/images/info_icon/breeze.svg" class="info-icon" />
            <span>空調</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Smoke-Free'] }">
            <img src="../assets/images/info_icon/no-smoke-symbol.svg" class="info-icon" />
            <span>禁止吸菸</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Refrigerator'] }">
            <img src="../assets/images/info_icon/bar.svg" class="info-icon" />
            <span>冰箱</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Mini-Bar'] }">
            <img src="../assets/images/info_icon/refrige.svg" class="info-icon" />
            <span>Mini Bar</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Child-Friendly'] }">
            <img src="../assets/images/info_icon/crawling-baby-silhouette.svg" class="info-icon" />
            <span>適合兒童</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Room-Service'] }">
            <img src="../assets/images/info_icon/room_service.svg" class="info-icon" />
            <span>Room Service</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Sofa'] }">
            <img src="../assets/images/info_icon/sofa.svg" class="info-icon" />
            <span>沙發</span>
          </div>
          <div class="amenity" :class="{ 'disable' : !roomDetail.amenities['Pet-Friendly'] }">
            <img src="../assets/images/info_icon/dog.svg" class="info-icon" />
            <span>攜帶寵物</span>
          </div>
        </div>
      </div>
      <div class="room-booking flex-rrs">
        <div class="room-price flex-ccr">
          <span>NT.{{ roomDetail.normalDayPrice }}</span>
          <span>平日(一~四)</span>
          <span>NT.{{ roomDetail.holidayPrice }}</span>
          <span>假日(五~日)</span>
        </div>
        <div class="date-wrapper">
          <DatePicker :reserved="booking" />
          <div class="button-group flex-rsac">
            <button class="reserve txt-c" @click="popup = true">預約時段</button>
            <button class="del-reserve txt-c" @click="delReservation">清除所有預約</button>
          </div>
        </div>
      </div>
    </div>

    <BookingDialog
      :popup="popup"
      :id="roomId"
      :detail="roomDetail"
      :reserved="booking"
      @popUpHandler="popup = false"
      @updateRoom="getRoomInfo"
    />
  </div>
</template>

<script>
import BookingDialog from "../components/BookingDialog";
import DatePicker from "../components/DatePicker";
import LightBox from "../components/LightBox";

export default {
  components: {
    BookingDialog,
    DatePicker,
    LightBox
  },
  data() {
    return {
      roomId: "",
      roomDetail: {
        descriptionShort: {},
        imageUrl: []
      },
      booking: [],
      popup: false,
      index:0,
      switchLightBox: false
    };
  },
  methods: {
    delReservation() {
      this.$http
        .delete(`https://challenge.thef2e.com/api/thef2e2019/stage6/rooms`, {
          headers: {
            Authorization: process.env.VUE_APP_APITOKEN,
            accept: "application/json"
          }
        })
        .then(response => {
          this.getRoomInfo();
          alert("已清除預約紀錄");
        });
    },
    getRoomInfo() {
      this.roomId = this.$route.params.id;
      this.$http
        .get(
          `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.roomId}`,
          {
            headers: {
              Authorization: process.env.VUE_APP_APITOKEN,
              accept: "application/json"
            }
          }
        )
        .then(response => {
          this.roomDetail = response.data.room[0];
          this.booking = response.data.booking;
        });
    },
    lightBoxSwitch() {
      this.switchLightBox = false;
    }
  },
  mounted() {
    this.getRoomInfo();
  }
};
</script>

<style lang="scss" scoped>
.room-gallery {
  display: flex;
  height: 600px;
  position: relative;
  margin-bottom: 45px;
  cursor: pointer;
  .room-left {
    width: 70%;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
  }
  .room-right {
    width: 30%;
    display: flex;
    flex-direction: column;
    & > div {
      height: 50%;
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: cover;
    }
  }
  .logo-block {
    position: absolute;
    top: 4%;
    left: 3%;
    z-index: 100;
  }
}

.room-container {
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.room-info {
  flex: 0 0 50%;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
  .room-type {
    font-size: 36px;
    letter-spacing: 3px;
    padding-bottom: 50px;
  }
  p {
    letter-spacing: 1.5px;
    line-height: 2;
  }
  .description {
    margin: 25px 0;
    font-size: 12px;
  }
  .check-date {
    letter-spacing: 1.5px;
    margin-bottom: 30px;
    .check-in,
    .check-out {
      width: 100%;
      .check-in-time,
      .check-out-time {
        font-size: 22px;
        padding-top: 7px;
      }
    }
  }
  .room-amenities {
    background: #f0f0f0;
    padding: 10px 20px;
    display: flex;
    flex-wrap: wrap;
    .amenity {
      display: flex;
      flex: 0 0 33.33%;
      align-items: center;
      margin: 10px 0;
      @media (max-width: 400px) {
        flex: 0 0 50%;
      }
      span {
        margin-left: 12px;
      }
    }
    .disable {
      opacity: 0.5;
    }
    .info-icon {
      width: 25px;
      height: 25px;
    }
  }
}

.room-booking {
  flex-wrap: wrap;
  flex: 0 0 50%;
  margin-bottom: 30px;
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-end;
  }
  @media (max-width: 768px) {
    flex: 0 0 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media (max-width: 576px) {
    justify-content: center;
  }
}

.room-price {
  letter-spacing: 1.5px;
  line-height: 1.5;
  padding-right: 30px;
  padding-bottom: 30px;
  & > span:nth-child(2n) {
    color: #6d7278;
  }
  & > span:first-child {
    font-size: 30px;
  }
  & > span:nth-child(3) {
    margin-top: 15px;
  }
}

.reserve,
.del-reserve {
  font-size: 16px;
  color: #ffffff;
  background: #575757;
  border: none;
  outline: 0;
  width: 120px;
  height: 50px;
  padding: 1% 2%;
  cursor: pointer;
  position: relative;
  transition: 0.3s ease-in-out;
  &:hover {
    background: #696969;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 4px;
    left: 4px;
    width: 100%;
    height: 100%;
    background-size: 5px 5px;
  }
}
.calendar {
  border-radius: 0;
  background-color: #f7f7f7;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  z-index: 1;
}
</style>